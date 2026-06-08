using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

[Authorize(Roles = "Admin")]
public class AdminMissionsController : Controller
{
    private readonly ElearningDbContext _context;

    public AdminMissionsController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(string? search, int? editId)
    {
        var query = _context.SystemMissions.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(mission =>
                EF.Functions.Like(mission.Title, $"%{search}%") ||
                EF.Functions.Like(mission.MetricKey, $"%{search}%"));
        }

        var missions = await query
            .OrderBy(mission => mission.SortOrder)
            .ThenByDescending(mission => mission.CreatedAt)
            .ToListAsync();

        var form = new AdminMissionFormViewModel();
        if (editId.HasValue)
        {
            var editMission = missions.FirstOrDefault(mission => mission.Id == editId.Value)
                ?? await _context.SystemMissions.AsNoTracking().FirstOrDefaultAsync(mission => mission.Id == editId.Value);

            if (editMission != null)
            {
                form = new AdminMissionFormViewModel
                {
                    Id = editMission.Id,
                    Title = editMission.Title,
                    RewardText = editMission.RewardText,
                    MetricKey = editMission.MetricKey,
                    TargetValue = editMission.TargetValue,
                    Icon = editMission.Icon,
                    ColorClass = editMission.ColorClass,
                    IsActive = editMission.IsActive,
                    SortOrder = editMission.SortOrder
                };
            }
        }

        return View(new AdminMissionsViewModel
        {
            Search = search,
            EditId = editId,
            Missions = missions,
            Form = form
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Upsert([Bind(Prefix = "Form")] AdminMissionFormViewModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Title) || string.IsNullOrWhiteSpace(model.MetricKey))
        {
            TempData["MissionMessage"] = "Title và MetricKey là bắt buộc.";
            return RedirectToAction(nameof(Index), new { editId = model.Id });
        }

        SystemMission? mission;
        if (model.Id.HasValue)
        {
            mission = await _context.SystemMissions.FirstOrDefaultAsync(m => m.Id == model.Id.Value);
            if (mission == null)
            {
                return NotFound();
            }
        }
        else
        {
            mission = new SystemMission { CreatedAt = DateTime.Now };
            _context.SystemMissions.Add(mission);
        }

        mission.Title = model.Title.Trim();
        mission.RewardText = model.RewardText.Trim();
        mission.MetricKey = model.MetricKey.Trim().ToLowerInvariant();
        mission.TargetValue = Math.Max(1, model.TargetValue);
        mission.Icon = string.IsNullOrWhiteSpace(model.Icon) ? "check_circle" : model.Icon.Trim();
        mission.ColorClass = string.IsNullOrWhiteSpace(model.ColorClass) ? "primary" : model.ColorClass.Trim();
        mission.IsActive = model.IsActive;
        mission.SortOrder = model.SortOrder;

        await _context.SaveChangesAsync();
        TempData["MissionMessage"] = model.Id.HasValue ? "Mission đã được cập nhật." : "Mission đã được tạo.";

        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ToggleActive(int id)
    {
        var mission = await _context.SystemMissions.FirstOrDefaultAsync(m => m.Id == id);
        if (mission == null)
        {
            return NotFound();
        }

        mission.IsActive = !mission.IsActive;
        await _context.SaveChangesAsync();

        TempData["MissionMessage"] = mission.IsActive ? "Mission đã được bật." : "Mission đã được tắt.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var mission = await _context.SystemMissions.FirstOrDefaultAsync(m => m.Id == id);
        if (mission == null)
        {
            return NotFound();
        }

        _context.SystemMissions.Remove(mission);
        await _context.SaveChangesAsync();
        TempData["MissionMessage"] = "Mission đã được xóa.";

        return RedirectToAction(nameof(Index));
    }
}