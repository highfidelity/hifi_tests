# General
This document describes the philosophy behind the testing infrastructure and then details the requirements for writing test scripts.  
`nitpick` is a stand-alone tool, and is a component of the High Fidelity project; it is documented in that project.
# Multiple Platforms create multiple results
`nitpick` supports the High Fidelity capability of running on multiple platforms, as well as on mobile devices and stand-alone headsets.
A test can generate different results (or simply  not run) depending on the platform and the type of user experience offered.  
We describe the type of experience and features offered from the Interface client as a combination of the following criteria
- device: VR-PC (high/mid end gamer rig PC) / PC-book (laptop mac or intel gpu PC) / mobile (android phone or tablet or standalone VR)
- display: mono / hmd (/ stereo)
- input: mouse&keyboard / hands / touch

Here is the list of _Client Profiles_ supported:  
- "VR-High": VR-PC + hmd + hands  
- "Desktop-High": VR-PC + mono + mouse&keyboard  
- "Desktop-Low": PC-book + mono + mouse&keyboard  
- "Mobile-Touch": mobile + mono + touch  
- "VR-Standalone": mobile + hmd + hands 

The OS (Windows/macOS/Linux/Android) and CPU (I5/I7) and graphics card (AMD/NVidia) can be detected automatically by by both `nitpick` and the test scripts.
The display device will be selected by a command line parameter to Interface; this parameter can then be accessed  by the test scripst as needed.

The selected _CLient Profiles_ define both the set of test scripts that are run, and the set of expected images.  
Each test script will query Interface for the selected profiles and will either exit gracefully or run;  if running, it may include internal branches based on the platform.
The expected images are divided into 2 sets.  The first set includes those images which are identical for all platforms.
The second set includes subsets for each platform, each subset including those images that are unique for each platform.

# Engine Test Plan

This repository folder is the root of the master database of test cases for the core engine features of High Fidelity platform.
This folder is managed by the Engine Team.
Our goal is to document the expected behavior of every features of the platform and to demonstrate through simple tests that the actual product is behaving as expected.
The testing technique depends on the aspect or behavior beeing demonstrated, these techniques can be:
- standalone script running in Interface.exe with some preconditions and producing an expected result (visual or print out)
- running Interface.exe with some preconditions in "test" mode and producing performance trace records of the test run that require to be analyzed
- running Interface.exe and performing a user story steps by steps (relying on the actual ui offered by the application and an actual QA User) to validate and expected result

## Test types
We identify different types of test used for different purpose
### Script test
- Must be performed by running a single script that could be automated
- Diagnostic is simple and should be automated asap (with output checker, or A/B images comparison)
- Demonstrating a single feature of the overall platform engine
- Should not rely on any UI of interface
- Must create and clean up the required asset, it cannot be specific to a particular domain
- No user interaction needed:
  - step1: load & run script
  - step2: observe results and diagnose test result
- Eventually multiple steps requiring a simple key pressed to move:
  - step1: load & run script
  - foreach steps 
    - stepI: observe results and diagnose step result
             wait on user 'space bar' pressed to move on
- described in a "test.md" file
### Story test
- Requires a user to perform the test, it cannot be automated
- Diagnostic should be simple and automated if possible (with output checker, or A/B images comparison)
- Demonstrating a particular use case of the overall platform engine as a combination of features
  Or a particular repro case for a bug
- Can rely on UI of the interface and existing content in specific domains
- Story can have multiple steps detailing each individual actions from the user and expected result to be observed
- described in a "story.md" file

## Folder Organization
A single Test Case lives in ONE folder with a mandatory file called test.md or story.md
The names of the files in the Test Case folder are simple and generic.

The full path name of the test case folder (including its parent folders) is representative of the actual feature or aspect tested.
All the files and folders of the path names are:
- lowercase (even acronyms)
- singular ('entity', not 'entities')
- represent a scope of nesting to avoid repetition ('zone', not 'zone_entity')
- if several word are required, they are separated by '_' ('normal_map', not 'normalMap')

The organization of the hierarchy is hopefully logical and simple to navigate. We will probably have to iterate on this tree organization to find a good naming scheme.

The initial hierarchy of folders is organized by the various types and sub types of content:
 - content/
   - entity/
     - shape/...
     - zone/
       - create/
         - test.md
         - ...
       - ...
     - ...
   - overlay/
     - web3D/...
     - ...
   - avatar/...
   - ...
 - engine/
   - interaction/
     - pointer/
       - laser/
         - hand_controller_grab/
           - story.md
           - ...
         - ...
       - ...
      - ...
   - render/...
     
The name of the test case are representative of the single feature or aspect tested in the test case. 
For example:
- create
- edit
- edit_color
- physics_dynamic

## Script Test
- the test.md file reference the script file and the expected result(s)
- the script file is stored in the test case folder and runs wihtout any user interaction required.
- the result is either a print out in the log out or and actuall snapshot of the rendering (also stored in the test case folder).
For example: [Entity Shape Create](./content/entity/shape/create)

### Script Guidelines
- Make the script automated as much as possible without any user input required at best
- Every entitiy created during the test must be deleted at the end of the script for cleanup
  - collect the entites created in a local array and delete them all on exit
    ```
    var createdEntities = [];
    ...

    // clean up after test
    Script.scriptEnding.connect(function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    }); 
    ```
  - use the "lifetime" properties when creating the entity (60 seconds for example) as a safety net
- When including shared scripts or resources stored in github, add '?raw=true' at the end of the URL to get the raw version.

## Story Test
- the story.md file reference the required files to perform during the test and the expected result(s)
- the result is either a print out in the log out or and actuall snapshot of the rendering (also stored in the test case folder).

## Test Folder Content
Each test is in a separate folder, which should contain the following files:
1. test.js - a module containing the test.  The contents are described in detail below.
2. runAuto.js - runs the test.js script automatically, creating a set of snapshots.
3. test.md - this is created by `nitpick`.
4. Expected_Image_xxxx - these are created by running the script and then using `nitpick`.
5. In addition - `nitpick` is used to create recursive scripts.  These are all named **testRecursive.js** and will run every applicable test (i.e., those named *test.js*) in all subfolders below this script.  This allows running **ALL** the tests, by running the *testRecursive.js* script located in the **tests** root folder.
# Test Script Structure
A test script has the following structure:
```
if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    var nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Test Description", Script.resolvePath("."), "secondary", undefined, function(testType) {
    // set up zones, objects and other entities 
    
    // create steps
  
   nitpick.runTest(testType);
});
```  
The first line verifies that *PATH_TO_THE_REPO_PATH_UTILS_FILE* points to a script named **branchUtils.js**.  This script will always be available in the master branch of the hifi_tests branch of the highfidelity user.  This is used to enable running tests from the repository of a different user for testing purposes.

The second line includes can then include **branchUtils.js**.

The third line creates the nitpick object, which stores the test steps, and then initiates the test (via *runTest*).

Tests are not run immediately. Instead all steps of all tests are first stored on a stack.  This is required because of the vagaries of the JavaScript language.
## Test Steps
A test step is a function that can also create a snapshot (the function is not compulsory, see below).  Loading entities and setting state take finite time, so the recommended procedure is to write pairs of steps, as follows:
```
    nitpick.addStep("Clear zone rotation", function () {
        Entities.editEntity(sphere, {visible: false });  
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0 )});  
        Entities.editEntity(zone, {keyLightMode: "disabled", skyboxMode: "enabled"});  
    });
    nitpick.addStepSnapshot("Sun straight ahead on purple background (sphere is hidden)");
```
The first step edits an entity, while the second step just takes a snapshot (note that it has no function).

The first parameter is a string describing the step.  This string is also used by `nitpick` when creating the MD file.

The final step in a test should delete all entities created by the test, and restore Interface to its state prior to the test (i.e. - restore shadows, point of view and avatar visibility).
