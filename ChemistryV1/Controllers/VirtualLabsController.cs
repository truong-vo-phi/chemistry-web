using ChemistryV1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.StaticFiles;
using System.IO.Compression;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace ChemistryV1.Controllers;

[AllowAnonymous]
public class VirtualLabsController : Controller
{
    private readonly ElearningDbContext _context;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public VirtualLabsController(ElearningDbContext context, IWebHostEnvironment webHostEnvironment)
    {
        _context = context;
        _webHostEnvironment = webHostEnvironment;
    }

    [HttpGet]
    public async Task<IActionResult> Play(int id)
    {
        var lab = await _context.VirtualLabs.FirstOrDefaultAsync(v => v.Id == id);
        if (lab == null)
        {
            return NotFound();
        }

        if (string.IsNullOrWhiteSpace(lab.Url))
        {
            return NotFound();
        }

        var normalizedUrl = lab.Url.TrimStart('~');
        if (!normalizedUrl.StartsWith('/'))
        {
            normalizedUrl = "/" + normalizedUrl;
        }

        var relativePath = normalizedUrl.TrimStart('/');
        var webRootPath = Path.GetFullPath(_webHostEnvironment.WebRootPath);
        var physicalPath = Path.GetFullPath(Path.Combine(webRootPath, relativePath.Replace('/', Path.DirectorySeparatorChar)));

        if (!physicalPath.StartsWith(webRootPath + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(physicalPath, webRootPath, StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest();
        }

        if (!System.IO.File.Exists(physicalPath))
        {
            return NotFound();
        }

        var gameBaseUrl = normalizedUrl[..(normalizedUrl.LastIndexOf('/') + 1)];
        var gameDirectory = Path.GetDirectoryName(physicalPath)!;
        var buildDirectory = Path.Combine(gameDirectory, "Build");

        var returnUrl = Request.Query["returnUrl"].ToString();
        if (!Url.IsLocalUrl(returnUrl))
        {
            returnUrl = string.Empty;
        }

        var playerHtml = TryBuildUnityPlayerHtml(id, lab.Title, gameBaseUrl, buildDirectory, returnUrl);
        if (playerHtml != null)
        {
            Response.Headers["X-Content-Type-Options"] = "nosniff";
            Response.Headers["Cache-Control"] = "no-store";
            return Content(playerHtml, "text/html; charset=utf-8");
        }

        var html = await System.IO.File.ReadAllTextAsync(physicalPath);

        if (!Regex.IsMatch(html, @"<base\s+", RegexOptions.IgnoreCase))
        {
            html = Regex.Replace(
                html,
                @"<head(\s[^>]*)?>",
                match => $"{match.Value}\n    <base href=\"{gameBaseUrl}\">",
                RegexOptions.IgnoreCase,
                TimeSpan.FromMilliseconds(250));
        }

        html = Regex.Replace(
            html,
            @"var\s+buildUrl\s*=\s*[""']([^""']+)[""'];",
            match =>
            {
                var buildUrl = match.Groups[1].Value;
                if (buildUrl.StartsWith('/') ||
                    buildUrl.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
                    buildUrl.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
                {
                    return match.Value;
                }

                return $"var buildUrl = \"{gameBaseUrl}{buildUrl.TrimStart('/')}\";";
            },
            RegexOptions.IgnoreCase,
            TimeSpan.FromMilliseconds(250));

        html = Regex.Replace(
            html,
            @"streamingAssetsUrl\s*:\s*[""']StreamingAssets[""']",
            $"streamingAssetsUrl: \"{gameBaseUrl}StreamingAssets\"",
            RegexOptions.IgnoreCase,
            TimeSpan.FromMilliseconds(250));

        html = PreferUncompressedUnityAsset(html, buildDirectory, "dataUrl", ".data.br", ".data");
        html = PreferUncompressedUnityAsset(html, buildDirectory, "frameworkUrl", ".framework.js.br", ".framework.js");
        html = PreferUncompressedUnityAsset(html, buildDirectory, "codeUrl", ".wasm.br", ".wasm");

        var runtimeCss = """
            <style id="chemlab-unity-frame-fix">
                html, body {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    overflow: hidden;
                    background: #020617;
                }
                #unity-fullscreen-button {
                    display: none !important;
                }
                #unity-container,
                #unity-container.unity-desktop,
                #unity-container.unity-mobile {
                    position: absolute !important;
                    inset: 0 !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    transform: none !important;
                }
                #unity-canvas {
                    width: 100% !important;
                    height: 100% !important;
                    display: block !important;
                    background: #020617 !important;
                }
                #unity-footer {
                    pointer-events: none;
                }
            </style>
            """;

        html = Regex.Replace(
            html,
            @"</head>",
            $"{runtimeCss}\n</head>",
            RegexOptions.IgnoreCase,
            TimeSpan.FromMilliseconds(250));

        Response.Headers["X-Content-Type-Options"] = "nosniff";
        Response.Headers["Cache-Control"] = "no-store";

        return Content(html, "text/html; charset=utf-8");
    }

    [HttpGet("VirtualLabs/Play/{id:int}/{**assetPath}")]
    public async Task<IActionResult> PlayAsset(int id, string assetPath)
    {
        if (string.IsNullOrWhiteSpace(assetPath))
        {
            return await Play(id);
        }

        var lab = await _context.VirtualLabs.FirstOrDefaultAsync(v => v.Id == id);
        if (lab == null || string.IsNullOrWhiteSpace(lab.Url))
        {
            return NotFound();
        }

        var normalizedUrl = lab.Url.TrimStart('~');
        if (!normalizedUrl.StartsWith('/'))
        {
            normalizedUrl = "/" + normalizedUrl;
        }

        var webRootPath = Path.GetFullPath(_webHostEnvironment.WebRootPath);
        var indexPath = Path.GetFullPath(Path.Combine(webRootPath, normalizedUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar)));
        var gameDirectory = Path.GetDirectoryName(indexPath);
        if (string.IsNullOrWhiteSpace(gameDirectory))
        {
            return NotFound();
        }

        var assetPhysicalPath = Path.GetFullPath(Path.Combine(gameDirectory, assetPath.Replace('/', Path.DirectorySeparatorChar)));
        if (!assetPhysicalPath.StartsWith(gameDirectory + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest();
        }

        if (!System.IO.File.Exists(assetPhysicalPath))
        {
            return NotFound();
        }

        var provider = new FileExtensionContentTypeProvider();
        provider.Mappings[".data"] = "application/octet-stream";
        provider.Mappings[".wasm"] = "application/wasm";
        provider.Mappings[".br"] = "application/octet-stream";
        provider.Mappings[".gz"] = "application/octet-stream";

        if (!provider.TryGetContentType(assetPhysicalPath, out var contentType))
        {
            contentType = "application/octet-stream";
        }

        var fileName = Path.GetFileName(assetPhysicalPath);
        if (fileName.EndsWith(".br", StringComparison.OrdinalIgnoreCase))
        {
            Response.Headers.Append("Content-Encoding", "br");
            Response.Headers.Append("Vary", "Accept-Encoding");
            contentType = GetCompressedUnityContentType(fileName, "br");
        }
        else if (fileName.EndsWith(".gz", StringComparison.OrdinalIgnoreCase))
        {
            Response.Headers.Append("Content-Encoding", "gzip");
            Response.Headers.Append("Vary", "Accept-Encoding");
            contentType = GetCompressedUnityContentType(fileName, "gz");
        }

        Response.Headers["X-Content-Type-Options"] = "nosniff";
        Response.Headers["Cache-Control"] = "public,max-age=31536000,immutable";
        return PhysicalFile(assetPhysicalPath, contentType);
    }

    [HttpGet("VirtualLabs/Play/{assetRoot:regex(^(Build|TemplateData|StreamingAssets)$)}/{**assetRemainder}")]
    public async Task<IActionResult> PlayAssetFromLegacyRelativePath(string assetRoot, string? assetRemainder)
    {
        var virtualLabId = await ResolveVirtualLabIdFromReferer();
        if (!virtualLabId.HasValue)
        {
            return NotFound();
        }

        var assetPath = string.IsNullOrWhiteSpace(assetRemainder)
            ? assetRoot
            : $"{assetRoot}/{assetRemainder}";

        return await PlayAsset(virtualLabId.Value, assetPath);
    }

    private async Task<int?> ResolveVirtualLabIdFromReferer()
    {
        var referer = Request.Headers.Referer.ToString();
        if (string.IsNullOrWhiteSpace(referer))
        {
            return null;
        }

        var playMatch = Regex.Match(referer, @"/VirtualLabs/Play/(?<id>\d+)", RegexOptions.IgnoreCase);
        if (playMatch.Success && int.TryParse(playMatch.Groups["id"].Value, out var labId))
        {
            return labId;
        }

        var lessonMatch = Regex.Match(referer, @"/Lessons/Details/(?<id>\d+)", RegexOptions.IgnoreCase);
        if (!lessonMatch.Success || !int.TryParse(lessonMatch.Groups["id"].Value, out var lessonId))
        {
            return null;
        }

        return await _context.Lessons
            .Where(lesson => lesson.Id == lessonId)
            .Select(lesson => lesson.VirtualLabId)
            .FirstOrDefaultAsync();
    }

    private static void DecompressUnityBuildFiles(string buildDirectory)
    {
        foreach (var compressedFile in Directory.GetFiles(buildDirectory, "*.br", SearchOption.TopDirectoryOnly))
        {
            var outputFile = compressedFile[..^3];
            if (System.IO.File.Exists(outputFile))
            {
                continue;
            }

            using var input = System.IO.File.OpenRead(compressedFile);
            using var brotli = new BrotliStream(input, CompressionMode.Decompress);
            using var output = System.IO.File.Create(outputFile);
            brotli.CopyTo(output);
        }

        foreach (var compressedFile in Directory.GetFiles(buildDirectory, "*.gz", SearchOption.TopDirectoryOnly))
        {
            var outputFile = compressedFile[..^3];
            if (System.IO.File.Exists(outputFile))
            {
                continue;
            }

            using var input = System.IO.File.OpenRead(compressedFile);
            using var gzip = new GZipStream(input, CompressionMode.Decompress);
            using var output = System.IO.File.Create(outputFile);
            gzip.CopyTo(output);
        }
    }

    private static string? TryBuildUnityPlayerHtml(int labId, string title, string gameBaseUrl, string buildDirectory, string? returnUrl)
    {
        if (!Directory.Exists(buildDirectory))
        {
            return null;
        }

        var loaderFile = FindUnityAsset(buildDirectory, "*.loader.js", preferCompressed: false);
        var dataFile = FindUnityAsset(buildDirectory, "*.data", preferCompressed: false);
        var frameworkFile = FindUnityAsset(buildDirectory, "*.framework.js", preferCompressed: false);
        var wasmFile = FindUnityAsset(buildDirectory, "*.wasm", preferCompressed: false);

        if (loaderFile == null || dataFile == null || frameworkFile == null || wasmFile == null)
        {
            return null;
        }

        var buildBaseUrl = $"{gameBaseUrl}Build";
        var templateBaseUrl = $"{gameBaseUrl}TemplateData";
        var loaderUrl = $"{buildBaseUrl}/{loaderFile}";
        var dataUrl = $"{buildBaseUrl}/{dataFile}";
        var frameworkUrl = $"{buildBaseUrl}/{frameworkFile}";
        var wasmUrl = $"{buildBaseUrl}/{wasmFile}";
        var config = new
        {
            arguments = Array.Empty<string>(),
            dataUrl,
            frameworkUrl,
            codeUrl = wasmUrl,
            streamingAssetsUrl = $"{gameBaseUrl}StreamingAssets",
            companyName = "ChemLab",
            productName = title,
            productVersion = "1.0"
        };

        var jsonOptions = new JsonSerializerOptions
        {
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        };

        var safeTitle = HtmlEncoder.Default.Encode(title);
        var loaderUrlJson = JsonSerializer.Serialize(loaderUrl, jsonOptions);
        var configJson = JsonSerializer.Serialize(config, jsonOptions);
        var logoUrl = $"{templateBaseUrl}/unity-logo-dark.png";
        var preloadLinks = string.Empty;
        var safeReturnUrl = string.IsNullOrWhiteSpace(returnUrl) ? string.Empty : HtmlEncoder.Default.Encode(returnUrl);
        var backButtonHtml = string.IsNullOrWhiteSpace(safeReturnUrl)
            ? string.Empty
            : $"""
                <a class="unity-back" href="{safeReturnUrl}" aria-label="Quay l&#7841;i b&#224;i h&#7885;c">
                    <span>&larr;</span>
                    <strong>Quay l&#7841;i b&#224;i h&#7885;c</strong>
                </a>
                """;

        return $$"""
            <!doctype html>
            <html lang="vi">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
                <title>{{safeTitle}}</title>
                {{preloadLinks}}
                <style>
                    :root {
                        --unity-aspect: 1.6;
                    }
                    html, body {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        overflow: hidden;
                        overscroll-behavior: none;
                        touch-action: none;
                        -webkit-user-select: none;
                        user-select: none;
                        -webkit-tap-highlight-color: transparent;
                        background: #020617;
                        color: #e8f6ff;
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                    }
                    #unity-wrap {
                        position: fixed;
                        inset: 0;
                        display: grid;
                        place-items: center;
                        overflow: hidden;
                        touch-action: none;
                        background:
                            radial-gradient(circle at 50% 20%, rgba(39,216,255,.16), transparent 18rem),
                            linear-gradient(180deg, #071225, #020617);
                    }
                    #unity-canvas {
                        width: min(100vw, calc(100vh * var(--unity-aspect))) !important;
                        height: min(100vh, calc(100vw / var(--unity-aspect))) !important;
                        max-width: 100vw !important;
                        max-height: 100vh !important;
                        display: block;
                        outline: none;
                        touch-action: none;
                        -webkit-user-select: none;
                        user-select: none;
                        image-rendering: auto;
                        image-rendering: high-quality;
                        transform: translateZ(0);
                        backface-visibility: hidden;
                        background: #020617;
                    }
                    @supports (height: 100dvh) {
                        #unity-canvas {
                            width: min(100vw, calc(100dvh * var(--unity-aspect))) !important;
                            height: min(100dvh, calc(100vw / var(--unity-aspect))) !important;
                            max-height: 100dvh !important;
                        }
                    }
                    #unity-loading {
                        position: fixed;
                        inset: 0;
                        z-index: 5;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        gap: 1rem;
                        background: rgba(2, 6, 23, .72);
                    }
                    #unity-loading img {
                        width: 5rem;
                        height: auto;
                        opacity: .84;
                    }
                    #unity-progress {
                        width: min(18rem, 70vw);
                        height: .55rem;
                        overflow: hidden;
                        border-radius: 999px;
                        border: 1px solid rgba(39,216,255,.32);
                        background: rgba(8,17,33,.9);
                    }
                    #unity-progress > span {
                        display: block;
                        width: 0%;
                        height: 100%;
                        border-radius: inherit;
                        background: linear-gradient(90deg, #27d8ff, #75ff6a);
                        box-shadow: 0 0 24px rgba(39,216,255,.55);
                        transition: width .18s ease;
                    }
                    #unity-status {
                        width: min(28rem, 82vw);
                        color: #a9bfd2;
                        font: 600 .88rem/1.45 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                        text-align: center;
                        text-shadow: 0 1px 12px rgba(0,0,0,.38);
                    }
                    #unity-status strong {
                        color: #e8f6ff;
                    }
                    #unity-error {
                        position: fixed;
                        left: 1rem;
                        right: 1rem;
                        bottom: 1rem;
                        z-index: 6;
                        display: none;
                        padding: .9rem 1rem;
                        border-radius: .85rem;
                        border: 1px solid rgba(255,77,125,.4);
                        background: rgba(60, 10, 25, .92);
                        color: #fff;
                        font-size: .9rem;
                        line-height: 1.45;
                    }
                    .unity-back {
                        position: fixed;
                        left: max(1rem, env(safe-area-inset-left));
                        top: max(1rem, env(safe-area-inset-top));
                        z-index: 8;
                        display: inline-flex;
                        align-items: center;
                        gap: .55rem;
                        min-height: 2.75rem;
                        padding: .65rem .9rem;
                        border-radius: .95rem;
                        border: 1px solid rgba(39,216,255,.34);
                        background: rgba(2, 6, 23, .72);
                        color: #e8f6ff;
                        font: 700 .9rem/1.1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                        text-decoration: none;
                        backdrop-filter: blur(14px);
                        -webkit-backdrop-filter: blur(14px);
                    }
                    .unity-back span {
                        font-size: 1.35rem;
                        line-height: 1;
                    }
                    #unity-rotate {
                        position: fixed;
                        inset: 0;
                        z-index: 7;
                        display: none;
                        align-items: center;
                        justify-content: center;
                        padding: max(1.25rem, env(safe-area-inset-top)) max(1.25rem, env(safe-area-inset-right)) max(1.25rem, env(safe-area-inset-bottom)) max(1.25rem, env(safe-area-inset-left));
                        text-align: center;
                        background:
                            radial-gradient(circle at 50% 42%, rgba(39,216,255,.20), transparent 15rem),
                            linear-gradient(180deg, rgba(2,6,23,.76), rgba(2,6,23,.94));
                        color: #e8f6ff;
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                    }
                    .rotate-card {
                        width: min(22rem, 92vw);
                        padding: 1.2rem;
                        border-radius: 1.25rem;
                        border: 1px solid rgba(39,216,255,.34);
                        background: rgba(5, 13, 30, .78);
                        box-shadow: 0 0 44px rgba(39,216,255,.18), 0 28px 80px rgba(0,0,0,.44);
                    }
                    .rotate-icon {
                        width: 4rem;
                        height: 4rem;
                        margin: 0 auto .9rem;
                        display: grid;
                        place-items: center;
                        border-radius: 1.2rem;
                        color: #27d8ff;
                        border: 1px solid rgba(39,216,255,.38);
                        background: rgba(39,216,255,.10);
                        box-shadow: 0 0 30px rgba(39,216,255,.22);
                        font-size: 2rem;
                    }
                    .rotate-card strong {
                        display: block;
                        font-size: 1.2rem;
                        line-height: 1.2;
                        margin-bottom: .45rem;
                    }
                    .rotate-card span:last-child {
                        display: block;
                        color: #a9bfd2;
                        font-size: .9rem;
                        line-height: 1.5;
                    }
                    body.is-touch.is-portrait #unity-rotate {
                        display: flex;
                    }
                    body.is-touch.is-portrait #unity-canvas {
                        opacity: .16;
                        filter: blur(1.5px) saturate(.9);
                        pointer-events: none;
                    }
                    body.is-touch:not(.is-portrait) #unity-canvas {
                        width: 100vw !important;
                        height: 100vh !important;
                        max-width: 100vw !important;
                        max-height: 100vh !important;
                        transform: translateZ(0) scale(var(--unity-mobile-zoom, 1.03));
                        transform-origin: center center;
                    }
                    @supports (height: 100dvh) {
                        body.is-touch:not(.is-portrait) #unity-canvas {
                            height: 100dvh !important;
                            max-height: 100dvh !important;
                        }
                    }
                    body.is-touch:not(.is-portrait) .unity-back {
                        left: max(.55rem, env(safe-area-inset-left));
                        top: max(.55rem, env(safe-area-inset-top));
                        min-height: 2.35rem;
                        padding: .48rem .65rem;
                        border-radius: .75rem;
                        font-size: .78rem;
                        background: rgba(2, 6, 23, .50);
                    }
                    body.is-touch:not(.is-portrait) .unity-back strong {
                        display: none;
                    }
                    body.is-touch:not(.is-portrait) .unity-back span {
                        font-size: 1.25rem;
                    }
                    #unity-fullscreen-prompt {
                        position: fixed;
                        right: max(.65rem, env(safe-area-inset-right));
                        bottom: max(.65rem, env(safe-area-inset-bottom));
                        z-index: 9;
                        display: none;
                        align-items: center;
                        gap: .45rem;
                        min-height: 2.45rem;
                        padding: .52rem .78rem;
                        border: 1px solid rgba(117,255,106,.42);
                        border-radius: .85rem;
                        color: #06230a;
                        background: linear-gradient(135deg, #75ff6a, #27d8ff);
                        box-shadow: 0 0 30px rgba(117,255,106,.24);
                        font: 900 .78rem/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                    }
                    body.is-touch:not(.is-portrait):not(.is-fullscreen) #unity-fullscreen-prompt {
                        display: inline-flex;
                    }
                </style>
            </head>
            <body>
                {{backButtonHtml}}
                <div id="unity-wrap">
                    <canvas id="unity-canvas" width="960" height="600" tabindex="0"></canvas>
                </div>
                <button id="unity-fullscreen-prompt" type="button">
                    <span>&#9974;</span>
                    <strong>To&#224;n m&#224;n h&#236;nh</strong>
                </button>
                <div id="unity-rotate" aria-hidden="true">
                    <div class="rotate-card">
                        <div class="rotate-icon">&#8635;</div>
                        <strong>Xoay ngang &#273;i&#7879;n tho&#7841;i &#273;&#7875; ch&#417;i</strong>
                        <span>Game d&#249;ng khung ngang 960&#215;600. Xoay m&#225;y tr&#432;&#7899;c r&#7891;i ch&#7841;m v&#224;o m&#224;n ch&#417;i &#273;&#7875; thao t&#225;c ch&#237;nh x&#225;c.</span>
                    </div>
                </div>
                <div id="unity-loading">
                    <img src="{{logoUrl}}" alt="">
                    <div id="unity-progress"><span></span></div>
                    <div id="unity-status"><strong>&#272;ang t&#7843;i game...</strong> L&#7847;n &#273;&#7847;u tr&#234;n server c&#243; th&#7875; m&#7845;t 1-2 ph&#250;t, vui l&#242;ng gi&#7919; nguy&#234;n trang.</div>
                </div>
                <div id="unity-error"></div>
                <script>
                    const canvas = document.getElementById("unity-canvas");
                    const loading = document.getElementById("unity-loading");
                    const progress = document.querySelector("#unity-progress > span");
                    const statusText = document.getElementById("unity-status");
                    const errorBox = document.getElementById("unity-error");
                    const fullscreenPrompt = document.getElementById("unity-fullscreen-prompt");
                    const loaderUrl = {{loaderUrlJson}};
                    const config = {{configJson}};
                    const isTouchDevice = matchMedia("(hover: none), (pointer: coarse)").matches ||
                        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                    let unityInstance = null;

                    config.devicePixelRatio = isTouchDevice
                        ? Math.min(window.devicePixelRatio || 1, 2.75)
                        : 1;
                    config.matchWebGLToCanvasSize = true;
                    config.webglContextAttributes = {
                        alpha: false,
                        antialias: false,
                        depth: true,
                        stencil: false,
                        preserveDrawingBuffer: false,
                        powerPreference: "high-performance"
                    };
                    config.cacheControl = (url) => {
                        if (/\.(data|wasm|bundle|js)(\.br|\.gz)?$/i.test(url)) {
                            return "immutable";
                        }

                        return "must-revalidate";
                    };
                    config.showBanner = (message, type) => {
                        if (type === "error") {
                            loading.style.display = "none";
                            errorBox.textContent = message;
                            errorBox.style.display = "block";
                        } else if (statusText) {
                            statusText.textContent = message;
                        }
                    };

                    const wakeUnity = () => {
                        try {
                            window.focus();
                            canvas.focus({ preventScroll: true });
                        } catch (_) {
                            canvas.focus();
                        }
                    };

                    const updateOrientationState = () => {
                        document.body.classList.toggle("is-touch", isTouchDevice);
                        document.body.classList.toggle("is-portrait", isTouchDevice && window.innerHeight > window.innerWidth);
                        document.body.classList.toggle("is-fullscreen", !!(document.fullscreenElement || document.webkitFullscreenElement));
                    };

                    const enterFullscreenMode = async () => {
                        const target = document.documentElement;
                        try {
                            if (!document.fullscreenElement && target.requestFullscreen) {
                                await target.requestFullscreen({ navigationUI: "hide" });
                            } else if (!document.webkitFullscreenElement && target.webkitRequestFullscreen) {
                                target.webkitRequestFullscreen();
                            }
                        } catch (_) {
                            // Some mobile browsers reject fullscreen; keep the optimized canvas layout anyway.
                        }

                        try {
                            if (screen.orientation && screen.orientation.lock && window.innerWidth > window.innerHeight) {
                                await screen.orientation.lock("landscape");
                            }
                        } catch (_) {
                            // Orientation lock is best-effort and depends on browser policy.
                        }

                        wakeUnityLater();
                    };

                    const wakeUnityLater = () => {
                        updateOrientationState();
                        wakeUnity();
                        window.setTimeout(wakeUnity, 80);
                        window.setTimeout(wakeUnity, 240);
                        window.setTimeout(wakeUnity, 600);
                    };

                    const touchPoint = (event) => {
                        const touch = event.changedTouches && event.changedTouches.length
                            ? event.changedTouches[0]
                            : event.touches && event.touches.length
                                ? event.touches[0]
                                : null;
                        return touch;
                    };

                    const dispatchPointerLikeEvent = (type, touch, buttons) => {
                        const init = {
                            bubbles: true,
                            cancelable: true,
                            composed: true,
                            view: window,
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                            screenX: touch.screenX,
                            screenY: touch.screenY,
                            button: 0,
                            buttons
                        };

                        if (window.PointerEvent) {
                            canvas.dispatchEvent(new PointerEvent(type, {
                                ...init,
                                pointerId: 1,
                                pointerType: "touch",
                                isPrimary: true,
                                width: touch.radiusX || 1,
                                height: touch.radiusY || 1,
                                pressure: buttons ? .5 : 0
                            }));
                        }
                    };

                    const dispatchMouseLikeEvent = (type, touch, buttons) => {
                        canvas.dispatchEvent(new MouseEvent(type, {
                            bubbles: true,
                            cancelable: true,
                            composed: true,
                            view: window,
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                            screenX: touch.screenX,
                            screenY: touch.screenY,
                            button: 0,
                            buttons
                        }));
                    };

                    const bridgeTouchToUnity = (event, phase) => {
                        const touch = touchPoint(event);
                        if (!touch) return;

                        event.preventDefault();
                        wakeUnity();

                        if (phase === "start") {
                            dispatchPointerLikeEvent("pointerdown", touch, 1);
                            dispatchMouseLikeEvent("mousemove", touch, 1);
                            dispatchMouseLikeEvent("mousedown", touch, 1);
                        } else if (phase === "move") {
                            dispatchPointerLikeEvent("pointermove", touch, 1);
                            dispatchMouseLikeEvent("mousemove", touch, 1);
                        } else {
                            dispatchPointerLikeEvent("pointerup", touch, 0);
                            dispatchMouseLikeEvent("mouseup", touch, 0);
                            dispatchMouseLikeEvent("click", touch, 0);
                        }
                    };

                    const claimTouch = () => {
                        wakeUnity();
                    };

                    ["pointerdown", "mousedown", "click"].forEach((eventName) => {
                        canvas.addEventListener(eventName, claimTouch, { passive: true });
                    });
                    canvas.addEventListener("touchstart", (event) => bridgeTouchToUnity(event, "start"), { passive: false });
                    canvas.addEventListener("touchmove", (event) => bridgeTouchToUnity(event, "move"), { passive: false });
                    canvas.addEventListener("touchend", (event) => bridgeTouchToUnity(event, "end"), { passive: false });
                    canvas.addEventListener("touchcancel", (event) => bridgeTouchToUnity(event, "end"), { passive: false });

                    window.addEventListener("message", (event) => {
                        if (!event.data || event.data.type !== "CHEMLAB_UNITY_WAKE") return;
                        wakeUnityLater();
                    });
                    window.addEventListener("resize", wakeUnityLater, { passive: true });
                    window.addEventListener("orientationchange", wakeUnityLater, { passive: true });
                    if (window.visualViewport) {
                        window.visualViewport.addEventListener("resize", wakeUnityLater, { passive: true });
                    }
                    document.addEventListener("fullscreenchange", wakeUnityLater, { passive: true });
                    document.addEventListener("webkitfullscreenchange", wakeUnityLater, { passive: true });
                    fullscreenPrompt?.addEventListener("click", enterFullscreenMode);
                    updateOrientationState();

                    const fail = (message) => {
                        loading.style.display = "none";
                        errorBox.textContent = message;
                        errorBox.style.display = "block";
                    };

                    const updateStatus = (message) => {
                        if (statusText) {
                            statusText.textContent = message;
                        }
                    };

                    let unityStarted = false;
                    let lastProgress = 0;
                    let lastProgressAt = Date.now();
                    const slowNetworkTimer = window.setTimeout(() => {
                        if (!unityStarted) {
                            updateStatus("Game v\u1eabn \u0111ang t\u1ea3i. N\u1ebfu server ho\u1eb7c m\u1ea1ng ch\u1eadm, h\u00e3y gi\u1eef nguy\u00ean trang v\u00e0 \u0111\u1ee3i th\u00eam m\u1ed9t ch\u00fat.");
                        }
                    }, 45000);
                    const stalledTimer = window.setInterval(() => {
                        if (unityStarted) {
                            window.clearInterval(stalledTimer);
                            return;
                        }

                        if (Date.now() - lastProgressAt > 90000) {
                            updateStatus("Tr\u00ecnh duy\u1ec7t \u0111ang kh\u1edfi \u0111\u1ed9ng Unity WebGL. Vui l\u00f2ng kh\u00f4ng t\u1eaft ho\u1eb7c t\u1ea3i l\u1ea1i trang.");
                        }
                    }, 10000);

                    const script = document.createElement("script");
                    script.src = loaderUrl;
                    script.async = true;
                    script.onload = () => {
                        createUnityInstance(canvas, config, (value) => {
                            const percent = Math.round(value * 100);
                            progress.style.width = `${percent}%`;
                            if (value > lastProgress + 0.005) {
                                lastProgress = value;
                                lastProgressAt = Date.now();
                            }

                            if (percent >= 90) {
                                updateStatus("\u0110ang kh\u1edfi \u0111\u1ed9ng game. B\u01b0\u1edbc n\u00e0y c\u00f3 th\u1ec3 h\u01a1i l\u00e2u tr\u00ean server, vui l\u00f2ng ch\u1edd...");
                            } else {
                                updateStatus(`\u0110ang t\u1ea3i d\u1eef li\u1ec7u game ${percent}%...`);
                            }
                        }).then((instance) => {
                            unityInstance = instance;
                            unityStarted = true;
                            window.clearTimeout(slowNetworkTimer);
                            window.clearInterval(stalledTimer);
                            loading.style.display = "none";
                            errorBox.style.display = "none";
                            wakeUnityLater();
                        }).catch((message) => {
                            window.clearTimeout(slowNetworkTimer);
                            window.clearInterval(stalledTimer);
                            fail(message || "Kh\u00f4ng th\u1ec3 kh\u1edfi ch\u1ea1y game Unity WebGL tr\u00ean thi\u1ebft b\u1ecb n\u00e0y.");
                        });
                    };
                    script.onerror = () => {
                        window.clearTimeout(slowNetworkTimer);
                        window.clearInterval(stalledTimer);
                        fail("Kh\u00f4ng t\u1ea3i \u0111\u01b0\u1ee3c Unity loader. Vui l\u00f2ng ki\u1ec3m tra l\u1ea1i file build.");
                    };
                    document.body.appendChild(script);
                </script>
            </body>
            </html>
            """;
    }

    private static string? FindUnityAsset(string buildDirectory, string pattern, bool preferCompressed)
    {
        var files = Directory.GetFiles(buildDirectory, pattern, SearchOption.TopDirectoryOnly)
            .Concat(preferCompressed ? Directory.GetFiles(buildDirectory, $"{pattern}.br", SearchOption.TopDirectoryOnly) : [])
            .OrderBy(path => preferCompressed && path.EndsWith(".br", StringComparison.OrdinalIgnoreCase) ? 0 : 1)
            .ThenBy(path => !preferCompressed && !path.EndsWith(".br", StringComparison.OrdinalIgnoreCase) ? 0 : 1)
            .ThenBy(path => path.Length)
            .ToList();

        return files.Count == 0 ? null : Path.GetFileName(files[0]);
    }

    private static string GetCompressedUnityContentType(string fileName, string compressionExtension)
    {
        var uncompressedName = fileName[..^(compressionExtension.Length + 1)];
        if (uncompressedName.EndsWith(".wasm", StringComparison.OrdinalIgnoreCase))
        {
            return "application/wasm";
        }

        if (uncompressedName.EndsWith(".js", StringComparison.OrdinalIgnoreCase))
        {
            return "application/javascript";
        }

        return "application/octet-stream";
    }

    private static string PreferUncompressedUnityAsset(
        string html,
        string buildDirectory,
        string configKey,
        string compressedExtension,
        string plainExtension)
    {
        if (!Directory.Exists(buildDirectory))
        {
            return html;
        }

        return Regex.Replace(
            html,
            $@"{configKey}\s*:\s*buildUrl\s*\+\s*[""']/(?<file>[^""']+{Regex.Escape(compressedExtension)})[""']",
            match =>
            {
                var compressedFile = match.Groups["file"].Value;
                var plainFile = compressedFile[..^compressedExtension.Length] + plainExtension;
                var plainPath = Path.Combine(buildDirectory, plainFile);
                return System.IO.File.Exists(plainPath)
                    ? $"{configKey}: buildUrl + \"/{plainFile}\""
                    : match.Value;
            },
            RegexOptions.IgnoreCase,
            TimeSpan.FromMilliseconds(250));
    }
}
