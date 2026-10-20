@echo off
setlocal EnableExtensions
cd /d "%~dp0.."

echo ================================================
echo AI Second Brain - Update Manager
echo ================================================

git fetch --tags --prune
if errorlevel 1 (
  echo [ERROR] Git update check failed.
  exit /b 1
)

git status --short

echo.
echo Available tags:
git tag --sort=-version:refname | more

echo.
echo The production launcher should consume the signed GitHub Release manifest.
echo This developer script updates source dependencies only; it does not overwrite user data.

if exist package.json npm install
if exist CMakeLists.txt cmake --build build --config Release

exit /b 0
