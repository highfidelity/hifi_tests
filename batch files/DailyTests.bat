@ECHO OFF

REM First parameter is compulsory - which GitHub branch to run from
REM Second parameter is compulsory - installation directory for the HighFidelity executable
REM Third parameter is compulsory - installation directory for the HighFidelity executable
REM Fourth parameter selects the GitHub user, default is "highfidelity" (useful for debugging)

REM Exit, with message, if branch parameter is missing
IF NOT "%~1" == "" GOTO :BRANCH_PARAMETER_FOUND
ECHO Missing branch parameter
EXIT /b

:BRANCH_PARAMETER_FOUND
    
SET BRANCH=%1
ECHO Starting Test for %BRANCH%

REM Exit, with message, if installation directory parameter is missing
IF NOT "%~2" == "" GOTO :INSTALLATION_DIRECTORY_PARAMETER_FOUND
ECHO Missing installation directory parameter
EXIT /b

:INSTALLATION_DIRECTORY_PARAMETER_FOUND
    
SET INSTALL_DIR=%2
ECHO Will install into %INSTALL_DIR%

REM Exit, with message, if test directory parameter is missing
IF NOT "%~3" == "" GOTO :TEST_DIRECTORY_PARAMETER_FOUND
ECHO Missing test directory parameter
EXIT /b

:TEST_DIRECTORY_PARAMETER_FOUND
    
SET TEST_RESULT_LOCATION=%3
ECHO Test results will be in %TEST_RESULT_LOCATION%

SET USER="highfidelity"
IF "%~4" == "" GOTO :NO_USER_PARAMETER
SET USER=%4

:NO_USER_PARAMETER

ECHO Before starting - stopping any local server that may be running
taskkill /im assignment-client.exe /f >nul
taskkill /im domain-server.exe /f >nul

REM PowerShell can load from a URL
ECHO Downloading Installation files
PowerShell.exe -ExecutionPolicy Bypass -Command "& '%~dpn0.ps1'"

REM Verify installer was downloaded
IF NOT EXIST HighFidelity-Beta-latest-dev.exe (
    @ECHO Download failed - test aborted
    EXIT
)

REM S - silent, D - directory
ECHO Running installer
START /WAIT HighFidelity-Beta-latest-dev.exe /S /D=%INSTALL_DIR%

ECHO Deleting all previous images
DEL %TEST_RESULT_LOCATION%\*.png

ECHO Starting local server
start "DS" %INSTALL_DIR%\domain-server.exe
start "AC" %INSTALL_DIR%\assignment-client.exe -n 6

ECHO Waiting for server to stabilize 
ping localhost -n 7 >nul

ECHO Running Interface tests
START /WAIT %INSTALL_DIR%\interface.exe --url hifi://localhost/8000,8000,8000/0,0.0,0.0,1.0 --testScript https://raw.githubusercontent.com/%USER%/hifi_tests/%BRANCH%/tests/testRecursive.js quitWhenFinished --testResultsLocation %TEST_RESULT_LOCATION%

ECHO Stopping local server
taskkill /im assignment-client.exe /f >nul
taskkill /im domain-server.exe /f >nul

ECHO Completed test, starting evaluation
START /WAIT %AUTOTESTER_PATH%\Release\auto-tester.exe --testFolder %TEST_RESULT_LOCATION% --branch %BRANCH% --user %USER%
ECHO Evaluation complete
