ECHO OFF
@ECHO Starting Test

REM PowerShell can load from a URL
@ECHO Downloading Installation files
PowerShell.exe -ExecutionPolicy Bypass -Command "& '%~dpn0.ps1'"

REM Verify installer was downloaded
IF NOT EXIST HighFidelity-Beta-8293.exe (
    @ECHO Download failed - test aborted
    EXIT
)

REM Directorys
SET INSTALL_DIR=D:\DT2
SET TEST_RESULT_LOCATION=D:\t

REM S - silent, D - directory
ECHO Running installer
START /WAIT HighFidelity-Beta-8293.exe /S /D=%INSTALL_DIR%

ECHO Starting local server
start "DS" %INSTALL_DIR%\domain-server.exe
start "AC" %INSTALL_DIR%\assignment-client.exe -n 6
 
ECHO Running Interface tests
%INSTALL_DIR%\interface.exe --url hifi://localhost/8000,8000,8000/0,0.0,0.0,1.0 --testScript https://raw.githubusercontent.com/NissimHadar/hifi_tests/DailyTests/tests/performance/thespot/testAuto.js quitWhenFinished --testResultsLocation %TEST_RESULT_LOCATION%

ECHO Stopping local server
taskkill /im assignment-client.exe /f >nul
taskkill /im domain-server.exe /f >nul

@ECHO Completed Test
