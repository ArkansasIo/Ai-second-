@echo off
setlocal EnableExtensions
cd /d "%~dp0.."

echo AI Second Brain - Clean Build Artifacts
if exist build rmdir /s /q build
if exist release rmdir /s /q release
if exist node_modules rmdir /s /q node_modules
if exist apps\web\dist rmdir /s /q apps\web\dist
if exist apps\api\dist rmdir /s /q apps\api\dist

echo Clean complete. User project data and source files were not removed.
exit /b 0
