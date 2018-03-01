var currentTestName = "";
var currentSteps = [];
var currentStepIndex = 0;

var testCases = [];
var currentlyExecutingTest = 0;

var testMode = "manual";

var snapshotPrefix = "";
var snapshotIndex = 0;

TestCase = function (name, path, func) {
    this.name = name;
    this.path = path;
    this.func = func;
}

var currentTestCase = null;
var usePrimaryCamera = false;
var currentRecursiveTestCompleted = false;

var runOneStep = function (stepFunctor, stepIndex) {
    print("Running step " + (stepIndex + 1) + "/" + (currentSteps.length) +": " + stepFunctor.name);
    Window.displayAnnouncement("Running step " + (stepIndex + 1) + "/" + (currentSteps.length) +": " + stepFunctor.name);

    if (stepFunctor.func !== undefined) {
        stepFunctor.func();
    }

    // Not quite sure this is the definitive solution here because of the snapshot bug latency issue.
    // but this seems to work ok if the snapshot is a separate step
    if ((stepFunctor.snap !== undefined) && stepFunctor.snap) {
        print("Taking snapshot " + (stepIndex + 1));
        
        var currentSnapshotName = snapshotPrefix + snapshotIndex.toString();
        usePrimaryCamera ? Window.takeSnapshot(currentSnapshotName) : Window.takeSecondaryCameraSnapshot(currentSnapshotName);
        ++snapshotIndex;
    }
}

var runNextStep = function () {
    // Run next step and increment only if there is one more
    if (currentStepIndex < currentSteps.length) {
        runOneStep(currentSteps[currentStepIndex], currentStepIndex);
        currentStepIndex++;
    }

    // Return true to go on or false if done
    return (currentStepIndex < currentSteps.length);
}

var testOver = function() {
    if (testMode == "manual") {
        Controller.keyPressEvent.disconnect(onKeyPressEventNextStep);
        Window.displayAnnouncement("Test " + currentTestName + " have been completed");
    }
    //Window.message("Test " + currentTestName + " over");
    print("Test over " + currentTestName);
    
    currentSteps = [];
    currentStepIndex = 0;
    currentTestName = "";
    currentTestCase = null;
    
    if (testMode === "manual" || testMode === "auto") {
        Script.stop();
    } else { // testMode === "recursive"
        currentRecursiveTestCompleted = true;
    }
}

var autoTimeStep = 2000;

var onRunAutoNext = function() {
    // run the step...
    if (!runNextStep()) {
        testOver();
        return;
    }

    // and call itself after next timer
    Script.setTimeout(
        onRunAutoNext,
        autoTimeStep
    );
}

var onRunAuto = function() {  
    // run the next step after next timer
    var STEP_TIME = 2000;   
    Script.setTimeout(
        onRunAutoNext,
        STEP_TIME
    );
}

var onKeyPressEventNextStep = function (event) {
    if (event.key == 32) {
        if (!runNextStep()) {
            testOver();
        }
    }
}

var onRunManual = function() {
    Window.displayAnnouncement(
        "Ready to run test " + currentTestName + "\n" +
        currentSteps.length + " steps\nPress [SPACE] for next steps");
         
    Controller.keyPressEvent.connect( onKeyPressEventNextStep );
}

// Add Steps to the test case
var doAddStep = function (name, stepFunction, snapshot) {
    currentSteps.push({"index": currentSteps.length, "name": name, "func": stepFunction, "snap": snapshot })
    print("PUSHING STEP" + currentSteps.length);
}

// The following are exported methods, accessible to test scripts

// Perform is the main method of a test
//      testName - name of the test
//      testPath - path the test is executing in
//      testMain - a function that creates the test
//
// The method creates a test case in currentTestCase.
// If the test mode is manual or auto then its execution is started
module.exports.perform = function (testName, testPath, testMain) {
    currentTestCase = new TestCase(testName, testPath, testMain);
    
    // Manual and auto tests are run immediately, recursive tests are stored in a queue
    if (testMode == "manual") {
        print("Begin manual test:" + testName);
        currentTestCase.func("manual");
    } else if (testMode == "auto") {
        print("Begin auto test:" + testName);
        currentTestCase.func("auto");
    } else {
        print("Not running yet - in recursive mode");
        testCases.push(currentTestCase);
    }
}

module.exports.setupTest = function (primaryCamera) {
    if (currentTestCase === null) {
        return;
    }

    // Clear the test case steps
    currentSteps = [];
    currentStepIndex = 0;
    currentTestName = currentTestCase.name;

    print("Setup test - " + currentTestName);        
    
    // Hide the avatar
    MyAvatar.setEnableMeshVisible(false);

    // Zero the head position
    MyAvatar.bodyYaw =   0.0;
    MyAvatar.bodyPitch = 0.0;
    MyAvatar.bodyRoll =  0.0;
    MyAvatar.headYaw =   0.0;
    MyAvatar.headPitch = 0.0;
    MyAvatar.headRoll =  0.0;

    // resolvePath(".") returns a string that looks like "file:/" + <current folder>
    // We need the current folder
    var path = currentTestCase.path.substring(currentTestCase.path.indexOf(":") + 4);
    var pathParts = path.split("/");
    
    // Snapshots are saved in the user-selected folder
    // For a test running from D:/GitHub/hifi-tests/tests/content/entity/zone/create/tests.js
    // the tests are named D_GitHub_hifi-tests_tests_content_entity_zone_create_0.jpg and so on
    // Date and time are not used as part of the name, to keep the path lengths to a minimum
    // (the Windows API limit is 260 characters).
    //
    snapshotPrefix = "";

    // On Windows the first part is <disk>: - this is changed
    var str = pathParts[0];
    if (str.indexOf(":") !== -1) {
        snapshotPrefix = str.replace(":", "").toUpperCase();
    }

    for (var i = 1; i < pathParts.length; ++i) {
        str = pathParts[i];
        
        // Replace any spaces
        str = str.replace(" ", "__");
        
        snapshotPrefix += "_" + str;
    }

    snapshotIndex = 0;
    
    var spectatorCameraConfig = Render.getConfig("SecondaryCamera");
    spectatorCameraConfig.enableSecondaryCameraRenderConfigs(true);
    spectatorCameraConfig.resetSizeSpectatorCamera(1920, 1080);
    spectatorCameraConfig.vFoV = 45;
    Render.getConfig("SecondaryCameraJob.ToneMapping").curve = 0;
    spectatorCameraConfig.orientation = MyAvatar.orientation;

    // Configure the camera
    spectatorCameraConfig.position = {x: MyAvatar.position.x, y: MyAvatar.position.y + 0.6, z: MyAvatar.position.z};

    if (primaryCamera) {
        usePrimaryCamera = true;
    }

    return spectatorCameraConfig;
}

// Add steps to the test case, take snapshot if 3rd parameter is true
module.exports.addStep = function (name, stepFunction, snapshot) {
    doAddStep(name, stepFunction, snapshot);
}

// Add steps to the test case, take snapshot
module.exports.addStepSnapshot = function (name, stepFunction) {
    doAddStep(name, stepFunction, true);
}

// The default mode is manual
// The default time between test steps may be modified through these methods
module.exports.enableAuto = function (timeStep) {
    testMode = "auto";
    if (timeStep) {
        autoTimeStep = timeStep;
    }
    print("TEST MODE AUTO SELECTED");
}

module.exports.enableRecursive = function (timeStep) {
    testMode = "recursive";
    if (timeStep) {
        autoTimeStep = timeStep;
    }
    print("TEST MODE RECURSIVE SELECTED");
}

// Steps is an array of functions; each function being a test step
module.exports.runTest = function () {
    // In recursive mode, this call is ignored
    if (testMode  == "auto") {
        onRunAuto();
    } else if (testMode = "manual") { 
        onRunManual();
    }
}

module.exports.runRecursive = function () {
    print("Starting recursive tests");
    
    currentRecursiveTestCompleted = true;
    var STEP_TIME = 2000;   
    Script.setInterval(
        function () {
            if (currentRecursiveTestCompleted) {
                currentRecursiveTestCompleted = false;
                if (testCases.length > 0) {
                    currentTestCase = testCases.pop();
                    currentTestCase.func("auto");
                } else {
                    print("Recursive tests complete");
                    Script.stop();
                }
            }
        },
        STEP_TIME
    );
}
