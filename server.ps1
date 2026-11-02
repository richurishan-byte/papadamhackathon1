# A Better Tomorrow - Lightweight PowerShell Web Server
$port = 3000
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$port/"

try {
    $listener.Prefixes.Add($prefix)
    $listener.Start()
} catch {
    $port = 3001
    $prefix = "http://localhost:$port/"
    $listener.Prefixes.Clear()
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host " ✨ A BETTER TOMORROW - ETHEREAL WEB PLATFORM (PowerShell Host)" -ForegroundColor Yellow
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host " 🌐 Local Server running at: $prefix" -ForegroundColor Green
Write-Host " Press Ctrl+C in this terminal window to stop the server." -ForegroundColor Gray
Write-Host "=============================================================" -ForegroundColor Cyan

# Open browser automatically
Start-Process $prefix

$mimeMap = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
}

$root = $PSScriptRoot

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "/home") { $urlPath = "/index.html" }
        elseif ($urlPath -eq "/issues") { $urlPath = "/index.html" }
        elseif ($urlPath -eq "/impact") { $urlPath = "/index.html" }
        elseif ($urlPath -eq "/pledge") { $urlPath = "/index.html" }

        $filePath = Join-Path $root ($urlPath.TrimStart("/").Replace("/", "\"))

        if (-not (Test-Path $filePath -PathType Leaf)) {
            $filePath = Join-Path $root "index.html"
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeMap.ContainsKey($ext)) { $mimeMap[$ext] } else { "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch {
        # continue loop
    }
}

