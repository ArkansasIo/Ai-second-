@echo off
setlocal EnableExtensions
cd /d "%~dp0.."

echo ================================================
echo AI Second Brain - Test Suite
echo ================================================

if exist package.json (
  echo Running JavaScript/TypeScript tests...
  call npm test --if-present
  if errorlevel 1 exit /b 1
)

if exist CMakeLists.txt (
  if not exist build mkdir build
  cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
  if errorlevel 1 exit /b 1
  cmake --build build --config Debug
  if errorlevel 1 exit /b 1
  ctest --test-dir build -C Debug --output-on-failure
  if errorlevel 1 exit /b 1
)

echo All available tests completed successfully.
exit /b 0
