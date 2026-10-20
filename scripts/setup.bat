@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0.."

echo ================================================
echo AI Second Brain - Windows Setup
echo ================================================

where cmake >nul 2>&1 || echo [WARN] CMake not found. Install CMake and rerun setup.
where git >nul 2>&1 || echo [WARN] Git not found.
where node >nul 2>&1 || echo [WARN] Node.js not found.
where npm >nul 2>&1 || echo [WARN] npm not found.
where ollama >nul 2>&1 || echo [WARN] Ollama not found. Install Ollama for local AI.

if not exist build mkdir build
if exist package.json call npm install

if exist CMakeLists.txt (
  cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
  if errorlevel 1 exit /b 1
  cmake --build build --config Release
  if errorlevel 1 exit /b 1
)

echo.
echo Setup complete. Use scripts\start.bat to launch the local services.
exit /b 0
