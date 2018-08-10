# Utility Scripts Documentation
This file describes the utility functions and also provides details and tips for writing test scripts.
## branchUtils.js
Tests can be run locally (from a cloned repository) or directly from GitHub.  To facilitate testing tests, a script may define the repository to be used, instead of the default - the `master` branch of the `hifi_tests` repository.  This script provides the suppor for this functionality.

The script provides two methods.
- `getRepositoryPath` is used by the `autoTester.js` script (described in the next section).
- `createAutoTester` is used by each test script to provide an interface to `autoTester.js`.

## autoTester.js
### General
`autoTester.js` contains a number of utility methods that facilitate writing tests.  This file describes the folder structure, the boilerplate required to create a test and documents the functionality of the `autoTester.js` script.

The tests are designed to run from GitHub and do not need to be downloaded.  They can also be run locally (e.g. while developing tests).

The testing philosophy has 4 major objectives:
1. Exact reproduction of the snapshots to allow automatic comparison of actual results with the expected images.
1. Manual use of the tests for development purposes.
1. Clear and concise syntax for writing tests by developers
1. Simple execution of the tests by testers.
 
To achieve these objectives, the testing implementation includes the following design decisions:
1. To the maximum extent possible - snapshots are taken with the secondary camera.
This enables independent positioning, as well as control of the snapshot image size.

1. The test coordinate system is defined by the avatar's position (the avatar is rotated to point down the Z axis).
The avatar's position is defined as the hip position - therefore:  the test position is defined as a point a fixed height below the avatar (i.e. the assumed position of the avatar's feet) and the camera position is a fixed height above the avatar (i.e. the avatar's assumed eye position).

1. Two modes of advancing steps are provided - manual and automatic.

   1. In manual mode, pressing the `n` key will advance to the next step 
   1. In automatic mode, steps are advanced every 2 seconds.  The test may modify this value during setup.

1. **"Expected Images"** are created by running the test, and then using the `auto-tester` tool (documented [here](../../tools/autotester/README.md)).
  
A test case consists of initialization code followed by a series of steps. In general, the steps are in pairs:
* Create the image and position the camera
* Take the snapshot

It is suggested to set the following properties for all entities:
* lifetime: 60,
* position: Vec3.sum(MyAvatar.position, *some offset*),
* userData: JSON.stringify({ grabbableKey: { grabbable: false } })

### Origin Frame
An origin frame can be defined to create and position the assets required for the test relative to this origin.
The origin frame also helps defining the Validation Camera position
To define the origin frame, use the `defineOriginFrame()` method before any steps in the test case
The Origin Frame is then automatically computed from the actual **MyAvatar** position.

The orientation of the frame is world aligned.
The position of the frame is always 1m below the MyAvatar position (regardless of its size).
The position of the Validation Camera is then defined as 1.76m **up** from the origin position.

### Validation Camera
To validate a test, we are capturing snapshots from a 'Validation Camera'.
The view from this camera can be captured from the primary or the secondary views currently available on the rendering engine of Interface depending on the constraints of the test.
The actual camera used for capturing the validation image is an implementation issue (ideally they should work the same).
During the test, we will refer to 'validation Camera' 

The initial location of the Validation Camera is automatically updated when calling 'defineOriginFrame' 

The Validation camera can be accessed and moved around in the Origin Frame space using the following functions 
* validationCamera_setTranslation(offset vec3)
* validationCamera_translate(offset vec3)
* validationCamera_setRotation(rotation vec3)
* 
### Folder Structure
The top level folder of importance is `tests`.  The relevant contents of this folder are:
1. `testsOutline.md` - an outline of all available tests.  This file is created by `autoTester.exe`.
2. `testRecursive.js` - this is a script that can be run in Interface.  It executes all the applicable tests in the folder hierarchy (i.e. those tests named **test.js**).

A similar file is located in each relevant sub-folder.  These files are created by `autoTester.exe`.

3. `utils` - a set of utility scripts, including `autotester.js`.
4. A number of folders containing the actual tests.

Each test folder has (at least) 3 scripts and a number of images.
1. `test.js` - the actual test script.  Running this script runs the test in manual mode.
2. `testAuto.js` - runs the test in automatic mode.  This file is the same for all tests.
3. `test.md` - this file is a description of the test.  It is created by `autoTester.exe` from the test script and the expected images.

The expected images themselves are created in 2 stages:  running the test and then running `autoTester.exe` to create the images from the test results.

### Boilerplate
The first 2 lines define the GitHub repository.  This allows changing the repository for testing purposes.
```
if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
```
The next line loads the autoTester script (the script contains a module)
```
var autoTester = createAutoTester(Script.resolvePath("."));
```
The test itself is written in the perform method:
```
autoTester.perform("<test description string>", Script.resolvePath("."), "secondary", function(testType) {
    // set up zones, objects and other entities 
    
    // create steps
    
    var result = autoTester.runTest(testType);
});    
```
Note that "secondary" may be replaced by "primary".  This is needed for tests that require the primary camera.

The **`autoTester.runTest(testType);`** call is the line that requests the execution of the steps.  
As described above, steps usually come in pairs.  

The following is an example showing the idea:
```
    autoTester.addStep("Move to blue zone", function () {
        var offset = { x: 0.0, y: 0.0, z: -10.0 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, offset);
        validationCamera_setTranslation(offset);
        
        Entities.editEntity(sphere, { position: Vec3.sum(MyAvatar.position, SPHERE_OFFSET) });
    });
    autoTester.addStepSnapshot("Blue zone, dark ambient light");
```
The first step moves forward 10 metres (the avatar is looking *down* the Z axis).
### `autoTester.js` function documentation
#### `perform` method
`autoTester.js` provides the **`perform`** method, used in all tests.  This method accepts 4 parameters:
1. The name of the script (a string)
2. The path to the test.  This is used so we can include the path in the snapshots' names.
3. Which camera to use for validation.  This is "secondary" or "primary"
4. A single lambda function.  This function is run immediately, unless tests are being run in recursive mode.
This function accepts a single parameter "auto" or "manual", defining the mode that will be used when the test is executed. 

Recursive mode is selected by calling `autoTester.enableRecursive();` before calling perform.
Recursive tests are usually performed automatically as follows:
```
// This is an automatically generated file, created by auto-tester on Jun 1 2018, 11:24

user = "highfidelity/";
repository = "hifi_tests/";
branch = "master/";

var autoTester = Script.require("https://github.com/highfidelity/hifi_tests/blob/master/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/zone/zoneOrientation/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/zone/create/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/zone/ambientLightZoneEffects/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/zone/ambientLightInheritance/test.js?raw=true");

autoTester.runRecursive();
```
Note that this code is generated automatically by the `auto-tester` tool.
As shown in the snippet - *auto* mode is selected by `autoTester.enableAuto();`, *manual* is the default.
Also note that *recursive* is distinct from *auto/manual*.

**`perform`** creates a `TestCase` object with the parameters.
If not in recursive mode, this is executed immediately .  In recursive mode, the object is pushed on to `testCases`.  
This array is executed by the `autoTester.runRecursive();` method.  This method checks for the completion of the previous test,
every second.  If the test is complete and there are more tests then the next test case is run.
#### `runTest` method
This is the method that initiates execution of the test, in either *manual* or *auto* mode.
#### GitHub Repository utility methods
A number of methods provide information on the GitHub repository the tests are currently being run from.  "Default" refers to running tests from the _hifi_tests_ repository belonging to the _highfidelity_ user, on the _master_ branch.

Note that all results include the final **'/'**.
1. **module.exports.getRepositoryPath()** provides the repository, default is the path to _hifi_tests_
2. **module.exports.getTestsRootPath()** provides the path to the top-level tests folder
3. **module.exports.getUtilsRootPath()** provides the path to the top-level _utils_ folder
4. **module.exports.getAssetsRootPath()** provides the path to the top-level _assets_ folder. 
