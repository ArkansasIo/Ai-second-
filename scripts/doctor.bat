@echo off
setlocal EnableExtensions
cd /d "%~dp0.."

echo ================================================
echo AI Second Brain - System Diagnostics
 echo ================================================

for %%T in (git cmake node npm ollama) do (
  where %%T >nul 2>&1
  if errorlevel 1 (echo [MISSING] %%T) else (echo [OK] %%T)
)

if exist CMakeLists.txt (echo [OK] CMake project) else (echo [INFO] CMakeLists.txt not present yet)
if exist apps\api (echo [OK] API workspace) else (echo [INFO] API workspace not created yet)
if exist apps\web (echo [OK] Web workspace) else (echo [INFO] Web workspace not created yet)
if exist database\schema.sql (echo [OK] Database schema) else (echo [INFO] Database schema pending)

where ollama >nul 2>&1
if not errorlevel 1 (
  echo.
  echo Ollama models:
  ollama list
)

exit /b 0
