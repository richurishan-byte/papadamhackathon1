@echo off
title A Better Tomorrow - Local Server
cd /d "%~dp0"

echo =============================================================
echo    A BETTER TOMORROW - LOCAL WEB PLATFORM
echo =============================================================
echo Starting local web server...
echo.

set NODE_EXE=node
where node >nul 2>nul
if %errorlevel% equ 0 goto start_node

if exist "%LOCALAPPDATA%\Programs\cursor\resources\app\resources\helpers\node.exe" (
    set "NODE_EXE=%LOCALAPPDATA%\Programs\cursor\resources\app\resources\helpers\node.exe"
    goto start_node
)

if exist "C:\Program Files\nodejs\node.exe" (
    set "NODE_EXE=C:\Program Files\nodejs\node.exe"
    goto start_node
)

:: Fallback to PowerShell server
echo Node.js not detected in default path. Launching with PowerShell HttpListener...
start http://localhost:3000
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
goto end

:start_node
echo Using Node runtime: %NODE_EXE%
:: Launch default browser
start "" http://localhost:3000
"%NODE_EXE%" "%~dp0server.js"

:end
pause

