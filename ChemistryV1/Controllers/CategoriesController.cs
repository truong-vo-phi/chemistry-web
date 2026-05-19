using System;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

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
                        IsActive = courseCount > 0
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
        if (await _context.Categories.AnyAsync(c => c.Slug == category.Slug))
        {
            ModelState.AddModelError("Category.Slug", "Slug already exists.");
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

        if (await _context.Categories.AnyAsync(c => c.Slug == category.Slug && c.Id != id))
        {
            ModelState.AddModelError("Category.Slug", "Slug already exists.");
        }

        if (!ModelState.IsValid)
        {
            return View(viewModel);
        }

        category.UpdatedAt = DateTime.Now;
        _context.Update(category);
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
}
