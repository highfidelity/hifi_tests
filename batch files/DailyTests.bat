ECHO OFF
@ECHO Starting Test

REM PowerShell can load from a URL
@ECHO Downloading Installation files
PowerShell.exe -ExecutionPolicy Bypass -Command "& '%~dpn0.ps1'"

REM Verify installer was downloaded
IF NOT EXIST HighFidelity-Beta-latest-dev.exe (
    @ECHO Download failed - test aborted
    EXIT
)
    
REM Note that this requires the directory, but always installs to "High Fidelity"
REM So as not to delete the users previous version, the previous version is renamed, then renamed back after completion
IF EXIST "C:\Program Files\High Fidelity" (
    @ECHO Renaming previous version

    IF EXIST "C:\Program Files\High Fidelity - previous" (
        rmdir "C:\Program Files\High Fidelity - previous" /q /s
    )

    ren "C:\Program Files\High Fidelity" "High Fidelity - previous"
)

REM S - silent, D - directory
ECHO Running installer
HighFidelity-Beta-latest-dev.exe /S /D="C:\Program Files\High Fidelity"

ECHO Starting local server
start "DS" "C:\Program Files\High Fidelity\domain-server.exe"
start "AC" "C:\Program Files\High Fidelity\assignment-client.exe" -n 6
 
ECHO Running Interface tests
"C:\Program Files\High Fidelity\interface.exe" --url hifi://localhost/8000,8000,8000/0,0.0,0.0,1.0 --testScript https://raw.githubusercontent.com/NissimHadar/hifi_tests/DailyTests/tests/performance/dev-avatarisland/testAuto.js quitWhenFinished --testResultsLocation D:\t

ECHO Stopping local server
taskkill /im domain-server.exe /f
taskkill /im assignment-client.exe /f

ECHO Wait 6 seconds
ping 127.0.0.1 -n 7 >nul

REM Restore previous version if needed
IF EXIST "C:\Program Files\High Fidelity - previous" (
    ECHO Restoring previous version
    
    rmdir "C:\Program Files\High Fidelity" /q /s
    ren "C:\Program Files\High Fidelity - previous" "High Fidelity"
)

@ECHO Completed Test
