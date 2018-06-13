ECHO OFF
SET BRANCH=%1
@ECHO Starting Test for %BRANCH%

REM PowerShell can load from a URL
@ECHO Downloading Installation files
PowerShell.exe -ExecutionPolicy Bypass -Command "& '%~dpn0.ps1'"

REM Verify installer was downloaded
IF NOT EXIST HighFidelity-Beta-latest-dev.exe (
    @ECHO Download failed - test aborted
    EXIT
)

REM Directory for installation
REM Note that either directory will be created if needed.
SET INSTALL_DIR=D:\DT1
SET TEST_RESULT_LOCATION=D:\t

REM S - silent, D - directory
ECHO Running installer
START /WAIT HighFidelity-Beta-latest-dev.exe /S /D=%INSTALL_DIR%

ECHO Starting local server
start "DS" %INSTALL_DIR%\domain-server.exe
start "AC" %INSTALL_DIR%\assignment-client.exe -n 6
 
ECHO Running Interface tests
%INSTALL_DIR%\interface.exe --url hifi://localhost/8000,8000,8000/0,0.0,0.0,1.0 --testScript https://raw.githubusercontent.com/highfidelity/hifi_tests/%BRANCH%/tests/testRecursive.js quitWhenFinished --testResultsLocation %TEST_RESULT_LOCATION%

ECHO Stopping local server
taskkill /im assignment-client.exe /f >nul
taskkill /im domain-server.exe /f >nul

@ECHO Completed test, starting evaluation
START /WAIT %AUTOTESTER_PATH%\Release\auto-tester.exe --testFolder %TEST_RESULT_LOCATION% --branch %BRANCH%
@ECHO Evaluation complete
