using System;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authorization;

namespace ChemistryV1.Controllers;

[Authorize(Roles = "Admin")]
public class CategoriesController : Controller
{
    private readonly ElearningDbContext _context;

    public CategoriesController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(string? search)
    {
        var query = _context.Categories.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(c =>
                (c.Name != null && EF.Functions.Like(c.Name, $"%{search}%")) ||
                (c.Description != null && EF.Functions.Like(c.Description, $"%{search}%")));
        }

        var categories = await query
            .OrderBy(c => c.Name)
            .ToListAsync();

        var counts = await _context.CourseCategories
            .GroupBy(cc => cc.CategoryId)
            .Select(g => new { CategoryId = g.Key, Count = g.Count() })
            .ToListAsync();

        var countMap = counts.ToDictionary(c => c.CategoryId, c => c.Count);

        var viewModel = new CategoryManagementViewModel
        {
            Search = search,
            Categories = categories
                .Select(category =>
                {
                    countMap.TryGetValue(category.Id, out var courseCount);
                    return new CategoryCardViewModel
                    {
                        Category = category,
                        CourseCount = courseCount,
                        IsActive = category.IsActive
                    };
                })
                .ToList()
        };

        return View(viewModel);
    }

    public IActionResult Create()
    {
        var viewModel = new CategoryCreateEditViewModel
        {
            Category = new Category { IsActive = true },
            CourseCount = 0,
            CreatedDate = DateTime.Now
        };
        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(CategoryCreateEditViewModel viewModel)
    {
        var category = viewModel.Category;
        category.Slug = NormalizeSlug(category.Name, category.Slug);

        if (await _context.Categories.AnyAsync(c => c.Slug == category.Slug))
        {
            ModelState.AddModelError("Category.Slug", "Slug đã tồn tại.");
        }

        if (!ModelState.IsValid)
        {
            return View(viewModel);
        }

        category.CreatedAt = DateTime.Now;
        category.UpdatedAt = DateTime.Now;
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        var courseCount = await _context.CourseCategories
            .CountAsync(cc => cc.CategoryId == id);

        var viewModel = new CategoryCreateEditViewModel
        {
            Category = category,
            CourseCount = courseCount,
            CreatedDate = category.CreatedAt
        };

        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, CategoryCreateEditViewModel viewModel)
    {
        var category = viewModel.Category;
        if (id != category.Id)
        {
            return NotFound();
        }

        category.Slug = NormalizeSlug(category.Name, category.Slug);

        if (await _context.Categories.AnyAsync(c => c.Slug == category.Slug && c.Id != id))
        {
            ModelState.AddModelError("Category.Slug", "Slug đã tồn tại.");
        }

        if (!ModelState.IsValid)
        {
            return View(viewModel);
        }

        var dbCategory = await _context.Categories.FindAsync(id);
        if (dbCategory == null)
        {
            return NotFound();
        }

        dbCategory.Name = category.Name;
        dbCategory.Slug = category.Slug;
        dbCategory.Description = category.Description;
        dbCategory.Icon = category.Icon;
        dbCategory.IsActive = category.IsActive;
        dbCategory.UpdatedAt = DateTime.Now;

        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Delete(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        return View(category);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        var mappings = _context.CourseCategories.Where(cc => cc.CategoryId == id);
        _context.CourseCategories.RemoveRange(mappings);

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return RedirectToAction(nameof(Index));
    }

    private static string NormalizeSlug(string? name, string? fallbackSlug)
    {
        var baseText = string.IsNullOrWhiteSpace(name) ? fallbackSlug : name;
        if (string.IsNullOrWhiteSpace(baseText))
        {
            return Guid.NewGuid().ToString("N");
        }

        var normalized = baseText.Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
        var builder = new StringBuilder();

        foreach (var character in normalized)
        {
            if (CharUnicodeInfo.GetUnicodeCategory(character) != UnicodeCategory.NonSpacingMark)
            {
                builder.Append(character);
            }
        }

        var cleaned = Regex.Replace(builder.ToString(), @"[^a-z0-9\s-]", "");
        cleaned = Regex.Replace(cleaned, @"\s+", "-");
        cleaned = Regex.Replace(cleaned, @"-+", "-");
        return cleaned.Trim('-');
    }
}
