@echo off
setlocal

echo ========================================
echo AI Second Brain - Full Ollama Setup
echo ========================================

echo.
echo Checking Ollama installation...
where ollama >nul 2>&1
if %ERRORLEVEL% EQU 0 goto :installed

echo Ollama was not found on PATH.
echo Install the official Ollama Windows package, then run this script again.
echo.
echo Expected local endpoint: http://127.0.0.1:11434
exit /b 1

:installed
echo Ollama executable detected.
echo.
echo Starting Ollama service...
start "Ollama" /min ollama serve

timeout /t 3 /nobreak >nul

echo.
echo Listing installed models:
ollama list

echo.
echo AI Second Brain will discover installed models dynamically.
echo It will NOT silently download models without explicit policy approval.
echo.
endlocal
exit /b 0
