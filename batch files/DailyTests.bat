@echo "Starting Test"

REM Download latest version and associated XML file 
REM PowerShell can load from a URL
PowerShell.exe -ExecutionPolicy Bypass -Command "& '%~dpn0.ps1'"

REM Run the installer (/S - silent, D - directory)
REM Note that this requires the directory, but always installs to "High Fidelity"
REM So as not to delete the users previous version, the previous version is renamed, then renamed back after completion
ren "C:\Program Files\High Fidelity" "High Fidelity - previous"
HighFidelity-Beta-latest-dev.exe /S /D="C:\Program Files\High Fidelity"

REM Start the local server
start "DS" "C:\Program Files\High Fidelity\domain-server.exe"
start "AC" "C:\Program Files\High Fidelity\assignment-client.exe" -n 6
 
REM Run the performance test
"C:\Program Files\High Fidelity\interface.exe" --url hifi://localhost/8000,8000,8000/0,0.0,0.0,1.0 --testScript https://raw.githubusercontent.com/NissimHadar/hifi_tests/newAvatar/tests/performance/testPerformance.js quitWhenFinished --testResultsLocation D:\t

REM Restore previous version
rmdir "C:\Program Files\High Fidelity" /q /s
ren "C:\Program Files\High Fidelity - previous" "High Fidelity"

@echo "Completed Test"
