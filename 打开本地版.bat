@echo off
chcp 65001 >nul
cd /d "%~dp0"

rem 检测 5173 端口是否已有本地服务器在跑
netstat -ano | findstr /c:":5173" >nul 2>&1
if %errorlevel%==0 (
  echo [NOCTURNE] 本地服务器已在运行，直接打开浏览器...
  start "" "http://localhost:5173/#/"
  exit /b
)

echo [NOCTURNE] 正在启动本地开发服务器...
start "NOCTURNE Dev Server" cmd /k "npm run dev"
timeout /t 5 /nobreak >nul
start "" "http://localhost:5173/#/"
