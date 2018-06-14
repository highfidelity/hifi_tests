# Daily Tests
## General
`DailyTests.bat` is a Windows batch file that performs regression testing for the latest version (master) of High Fidelity Interface.  The batch file may be run from a command prompt, or executed at fixed times.

Two files are required to use the tests: `DailyTests.bat` calls a PowerShell script named `DailyTests.ps1` to download the latest HiFi installer from the Internet.  **Note** that the two scripts must have the same prefix to run correctly.

Please be aware that the HiFi installer is downloaded to the current directory.  In addition, an XML file is downloaded (`dev-builds.xml`) - this file contains the build number.

To test a specific build, say 8429, modify `DailyTests.ps1` to download *<http://builds.highfidelity.com/HighFidelity-Beta-8429.exe>* (instead of <http://builds.highfidelity.com/HighFidelity-Beta-latest-dev.exe>).
## Installation
### Windows UAC
To enable silent installation, Windows UAC has to be disabled.  Since a new installer is downloaded each time, it is not possible to disable UAC only for this file; therefore, UAC has to be fully disabled.  The procedure for this is as follows:
1. Go to Control Panel -> System and Security -> Security and Maintenance
2. Click Change User Account Control settings.
3. Set the slider to "Never Notify".
### Setup autoTester - Windows 10
1. Download and run <https://hifi-content.s3.amazonaws.com/nissim/autoTester/AutoTester-Installer.exe> to download and install the autoTester executable and its associated files.
You will be asked where you want to install - choose a convenient location.
2. Create an environment variable named `AUTOTESTER_PATH` and set it to the location you selected.
## Usage
Before running the test - make sure the HighFidelity server is not running; otherwise the installation of Interface will fail.
## Task Scheduling
I have used Splinterware's *System Scheduler* successfully, after failing to run a batch file from the Windows Task Scheduler.  The free version, which is all that is required, can be downloaded from <https://www.splinterware.com/download/index.html>. 
