REM @ECHO OFF

REM delete any existing autoTester
IF EXIST Release\NUL (
    RMDIR /S /Q Release
)

REM get autoTester executable zip from Amazon S3 (called Release.exe)
mkdir Release

REM PowerShell can load from a URL
PowerShell.exe -ExecutionPolicy Bypass -Command "& '%~dpn0.ps1'"

REM extract autoTester
Release.exe
del Release.exe
