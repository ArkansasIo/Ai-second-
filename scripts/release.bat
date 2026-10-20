@echo off
setlocal EnableExtensions
cd /d "%~dp0.."

if "%~1"=="" (
  echo Usage: scripts\release.bat ^<version^>
  echo Example: scripts\release.bat 0.2.0
  exit /b 2
)

set VERSION=%~1

echo ================================================
echo AI Second Brain - Release Preparation
 echo Version: %VERSION%
echo ================================================

call scripts\test.bat
if errorlevel 1 exit /b 1

if not exist release mkdir release

echo Building release manifest...
>release\release-manifest.json echo {
>>release\release-manifest.json echo   "product": "AI Second Brain",
>>release\release-manifest.json echo   "version": "%VERSION%",
>>release\release-manifest.json echo   "channel": "stable",
>>release\release-manifest.json echo   "generatedBy": "scripts/release.bat",
>>release\release-manifest.json echo   "updatePolicy": "verify-backup-migrate-install-healthcheck-rollback"
>>release\release-manifest.json echo }

git tag -a "v%VERSION%" -m "Release AI Second Brain %VERSION%"
echo.
echo Release tag created: v%VERSION%
echo Publish the tag through GitHub Releases after CI artifacts and checksums are verified.
exit /b 0
