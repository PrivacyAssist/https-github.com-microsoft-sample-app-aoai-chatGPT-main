
@echo off

 rem Rebuild front-end assets
cd frontend
npm install   rem Example command for installing Node.js dependencies
npm run build  rem Example command for building front-end assets
cd ..

rem Start your Python application
python main.py  rem Example command for starting the Python application

@echo off

echo.
echo Restoring backend python packages
echo.
call python -m pip install -r requirements.txt
if "%errorlevel%" neq "0" (
    echo Failed to restore backend python packages
    exit /B %errorlevel%
)

echo.
echo Restoring frontend npm packages
echo.
cd frontend
call npm install
if "%errorlevel%" neq "0" (
    echo Failed to restore frontend npm packages
    exit /B %errorlevel%
)

echo.
echo Building frontend

echo.
call npm run build
if "%errorlevel%" neq "0" (
    echo Failed to build frontend
    exit /B %errorlevel%
)

echo.    
echo Starting backend    
echo.    
cd ..  
start https://localhost:3000
call python -m uvicorn app:app  --port 3000 --reload
if "%errorlevel%" neq "0" (    
    echo Failed to start backend    
    exit /B %errorlevel%    
) 
