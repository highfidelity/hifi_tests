# Engine Test Plan

This repository folder is the root of the master database of test cases for the core engine features of High Fidelity platform.
This folder is managed by the Engine Team.
Our goal is to document the expected behavior of every features of the platform and to demonstrate through simple tests that the actual product is behaving as expected.
The testing technique depends on the aspect or behavior beeing demonstrated, these techniques can be:
- standalone script running in Interface.exe with some preconditions and producing an expected result (visual or print out)
- running Interface.exe with some preconditions in "test" mode and producing performance trace records of the test run that require to be analyzed
- running Interface.exe and performing a user story steps by steps (relying on the actual ui offered by the application and an actual QA User) to validate and expected result

As of now (October 2017) we are focusing on building a concrete database of the standalone scripts types which are simple and easy to automate in the long run.

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
- When including shared scripts or resources stored in github, add '?raw=true' at the end of the URL to get the raw version.

## Story Test
- the story.md file reference the required files to perform during the test and the expected result(s)
- the result is either a print out in the log out or and actuall snapshot of the rendering (also stored in the test case folder).

## TO BE CONTINUED
