$projectRoot = Split-Path -Parent $PSScriptRoot
$nodePath = (Get-Command node -ErrorAction SilentlyContinue).Source
if (-not $nodePath) { $nodePath = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' }
if (-not (Test-Path -LiteralPath $nodePath)) { Write-Host 'Node.js is required to open the editor.'; Read-Host 'Press Enter to close'; exit 1 }
$logFolder = Join-Path $projectRoot '.editor-backups'
New-Item -ItemType Directory -Force -Path $logFolder | Out-Null
try { $editorRunning = (Invoke-RestMethod 'http://127.0.0.1:4174/api/health' -TimeoutSec 2).app -eq 'portfolio-editor' } catch { $editorRunning = $false }
if (-not $editorRunning) { Start-Process -FilePath $nodePath -ArgumentList 'tools/editor-server.mjs' -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logFolder 'editor.log') -RedirectStandardError (Join-Path $logFolder 'editor-error.log') }
try { Invoke-WebRequest 'http://127.0.0.1:4173/portfolio/' -TimeoutSec 2 -UseBasicParsing | Out-Null } catch { Start-Process -FilePath $nodePath -ArgumentList 'node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173','--strictPort' -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logFolder 'preview.log') -RedirectStandardError (Join-Path $logFolder 'preview-error.log') }
Start-Sleep -Milliseconds 800
Start-Process 'http://127.0.0.1:4174/'
