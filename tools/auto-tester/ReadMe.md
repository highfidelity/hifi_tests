# General
Automatic testing is performed in 3 main stages.
1. Creating tests - the manual process of writing the actual tests.  This is described below.
1. Creating the expected images.  This can be done by running each test separately in Interface, or by using autoTester to select a top level directory - this will create a script that will run all tests recursively.
    1. autoTester is then used to rename all the resulting images (from *hifi-snap-by...* to *ExpectedImage_...*).
1. Regression testing.  This is done by using autoTester to select a directory.  This will then run all tests recursively, and compare the resulting images to those prepared in the 2nd stage.
## Creating Tests
A hierarchy of javascript tests are created in the tests folder hierarchy.  The requirements are as follows:
### Test name
The main test script is named __test.js__.  The test can call any number of scripts as required.
### Test protocol
The test will produce a number of snapshots in the directory.

One way to produce the snapshots is as follows.  

```
// test.js
// Set snapshot path to current directory
var combinedPath = Script.resolvePath(".");
var path = combinedPath.substring(combinedPath.indexOf(":") + 4);
Snapshot.setSnapshotsLocation(path);

// Allow 2 seconds between steps 
var STEP_TIME = 2000;

var step = 1;
Script.setTimeout(
  function() {
    // just wait for user to move mouse cursor out of window
  }, 
    
  step * STEP_TIME
);

step +=1;
Script.setTimeout(
  function() {
    Window.takeSnapshot();

    // Perform next step
  }, 
    
  step * STEP_TIME
);

step +=1;
Script.setTimeout(
  function() {
    Window.takeSnapshot();

    // Perform next step
  }, 
    
  step * STEP_TIME
);
```

Note that the snapshot is taken at the beginning of the next step, to give the image time to stabilize

# Setup
* The two required ImageMagick files are from ImageMagick-7.0.7-9-portable-Q16-x64.zip, downloaded from <https://www.imagemagick.org/script/download.php>.  These are used to compare pairs of images.

