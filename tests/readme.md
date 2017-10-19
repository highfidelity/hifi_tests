# Engine Test Plan

This repository folder is the root of the master database of test cases for the core engine features of High Fidelity platform.
This folder is managed by the Engine Team.
Our goal is to document the expected behavior of every features of the platform and to demonstrate through simple tests that the actual product is behaving as expected.
The testing technique depends on the aspect or behavior beeing demonstrated, these techniques can be:
- standalone script running in Interface.exe with some preconditions and producing an expected result (visual or print out)
- running Interface.exe with some preconditions in "test" mode and producing performance trace records of the test run that require to be analyzed
- running Interface.exe and performing a user story steps by steps (relying on the actual ui offered by the application and an actual QA User) to validate and expected result

As of now (October 2017) we are focusing on building a concrete database of the standalone scripts types which are simple and easy to automate in the long run.

## Folder Organization
A single Test Case lives in ONE folder with a mandatory file called test.md
The names of the files in the Test Case folder are simple and generic.
The full path name of the test case folder (including its parent folders) is representative of the actual feature or aspect tested.
All the names and folders are lowercase.
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

The name of the test case are representative of the single feature or aspect tested in the test case. 
For example:
- create
- edit
- edit_color
- physics_dynamic

## Standalone Script
- the test.md file reference the script file and the expected result(s)
- the script file is stored in the test case folder and runs wihtout any user interaction required.
- the result is either a print out in the log out or and actuall snapshot of the rendering (also stored in the test case folder).
For example: [Entity Shape Create](./content/entity/shape/create)

### Script Guidelines
- Make the script automated as much as possible without any user input required at best
- If user input is required to make test progress step by step use a simple Key event connected to the 'space" key:
   ```
   var _step = 0;
   Controller.keyPressEvent.connect(function(event){
       if (event.key == 32) {
          step++;
          executeStep(_step);
       }   
   });
   function executeStep(step) { ... }
   ```
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

## TO BE CONTINUED
