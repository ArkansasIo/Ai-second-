@echo off
setlocal EnableExtensions
cd /d "%~dp0.."

echo ================================================
echo AI Second Brain - Launcher
echo ================================================

where ollama >nul 2>&1
if not errorlevel 1 (
  echo Starting Ollama...
  start "AI Second Brain - Ollama" /min cmd /c "ollama serve"
) else (
  echo [WARN] Ollama is not installed or not on PATH.
)

if exist apps\api\package.json (
  echo Starting local API...
  start "AI Second Brain - API" cmd /c "cd /d "%CD%\apps\api" && npm run dev"
)

if exist apps\web\package.json (
  echo Starting web client...
  start "AI Second Brain - Web" cmd /c "cd /d "%CD%\apps\web" && npm run dev"
)

echo.
echo AI Second Brain services have been requested.
exit /b 0
