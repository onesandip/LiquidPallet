$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
    $listener.Start()
    Write-Host "LiquidPalette Kiosk Server active at http://localhost:$port/"
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($localPath)) { $localPath = "index.html" }
        $fullPath = Join-Path $PSScriptRoot $localPath
        if (Test-Path $fullPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            if ($fullPath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($fullPath.EndsWith(".js") -or $fullPath.EndsWith(".jsx")) { $response.ContentType = "application/javascript; charset=utf-8" }
            elseif ($fullPath.EndsWith(".css")) { $response.ContentType = "text/css; charset=utf-8" }
            elseif ($fullPath.EndsWith(".json")) { $response.ContentType = "application/json; charset=utf-8" }
            elseif ($fullPath.EndsWith(".jpg") -or $fullPath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            elseif ($fullPath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($fullPath.EndsWith(".svg")) { $response.ContentType = "image/svg+xml" }
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
}
