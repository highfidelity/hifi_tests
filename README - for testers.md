# Auto Tester

The auto-tester is a stand alone application that provides a mechanism for regression testing.  The general idea is simple:
* Each test folder has a script that produces a set of snapshots.
* The snapshots are compared to a 'canonical' set of images that have been produced beforehand.
* Scripts are provided for running a test automatically (vs. single stepping) and for recursively running all tests in a hierarchy of folders.

***Please note that before running any tests that your avatar must be in an empty part of the domain.***

## Running tests
Before running tests, choose a folder to store the snapshots.  This can be done from the Interface menu:  Settings->General - "Put my snapshots here".

Each test is located in a separate folder and is called **test.js**.  After loading the test, use the space-bar to advance.  Most steps will take a snapshot.

In the same folder, there is an automatic version, named **testAuto.js**.  This will run to completion after loading.

Relevant folders have a script called **testRecursive.js**.  Running this script will run all the test.js scripts in the folder and all those in the folders contained in this folder recursively.

## Setup autoTester - Windows 10
Download and run <https://hifi-content.s3.amazonaws.com/nissim/autoTester/Release.exe> to download and install the autoTester executable and its associated files.
You will be asked where you want to install - choose a convenient location.

## Using the auto-tester
The auto-tester provides a number of functions, only the second function is relevant for testing
1. Create tests
2. Evaluate tests
3. Create a recursive test script
4. Create recursive test script, recursively.

![](./autoTesterUI.png)

The *Interactive Mode* checkbox displays each failed test, allowing the user to pass the test, fail it, or abort the whole evaluation process.  If the checkbox is unchecked, then the evaluation will run to completion.
Any failures are stored in a zipped folder named as *TestResults--yyyy-mm-dd_hh-mm-ss.zip*.  This file is removed if no failures where found.