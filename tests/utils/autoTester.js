var currentTestName = "";
var currentSteps = [];
var currentStepIndex = 0;

var testCases = [];
var currentlyExecutingTest = 0;

var testMode = "manual";      // can be "auto"
var isRecursive = false;
var runningRecursive = false;

var snapshotPrefix = "";
var snapshotIndex = 0;

var advanceKey = "n";
var pathSeparator = ".";

var previousCameraMode;
var secondaryCameraHasBeenEnabled = false;

var downloadInProgress = false;
var loadingContentIsStillDisplayed = false;

// This will be set when each test case begins
var originFrame;

// origin is located 1m below avatar centre
// avatar eyes are set to 1.76 cm above the origin
const ORIGIN_FRAME_OFFSET = { x: 0.0, y: -1.0, z: 0.0 };
const VALIDATION_CAMERA_OFFSET = { x: 0.0, y: 1.76, z: 0.0 };

var spectatorCameraConfig;

TestCase = function (name, path, func, usePrimaryCamera) {
    this.name = name;
    this.path = path;
    this.func = func;
    this.usePrimaryCamera = usePrimaryCamera;
}

var currentTestCase = null;
var currentRecursiveTestCompleted = false;

//returns n as a string, padded to length characters with the character ch
function pad(n, length, ch) {
    ch = ch || '0';  // default is '0'
    n += '';         // convert n to string

    // returns n as is, if it is too long
    return (n.length >= length) ? n : new Array(length - n.length + 1).join(ch) + n;
}

function onDownloadInfoChanged(info) {
    // After download is complete, the "LOADING CONTENT..." message is still displayed for a short time
    if (info.downloading.length == 0 && info.pending == 0) {
        downloadInProgress = false;
        loadingContentIsStillDisplayed = true;
    }
}

var runOneStep = function (stepFunctor, stepIndex) {
    print("Running step " + (stepIndex + 1) + "/" + (currentSteps.length) +": " + stepFunctor.name);

    if (isManualMode()) {
        Window.displayAnnouncement("Running step " + (stepIndex + 1) + "/" + (currentSteps.length) +": " + stepFunctor.name);
    }
    
    if (stepFunctor.func !== undefined) {
        stepFunctor.func();
    }

    // Not quite sure this is the definitive solution here because of the snapshot bug latency issue.
    // but this seems to work ok if the snapshot is a separate step
    if ((stepFunctor.snap !== undefined) && stepFunctor.snap) {
        print("Taking snapshot for step " + (stepIndex + 1));
        
        // Image numbers are padded to 5 digits
        // Changing this number requires changing the auto-tester C++ code!
        var NUM_DIGITS = 5;
        var currentSnapshotName = snapshotPrefix + pad(snapshotIndex, NUM_DIGITS, '0') + ".png";

        currentTestCase.usePrimaryCamera 
            ? Window.takeSnapshot(isManualMode(), false, 0.0, currentSnapshotName) 
            : Window.takeSecondaryCameraSnapshot(isManualMode(), currentSnapshotName);

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

var autoTimeStep = 2000;

var onRunAutoNext = function() {
    var timeStep = autoTimeStep;

    // If not downloading then run the next step...
    if (!downloadInProgress  && !loadingContentIsStillDisplayed) {
        if (!runNextStep()) {
            tearDownTest();
            return;
        }
    } else if (!downloadInProgress) {
        // This assumes the message is displayed for not more than 4 seconds
        print("Waiting for 'LOADING CONTENT...' message to be removed");
        timeStep = 4000;
        loadingContentIsStillDisplayed = false;
    } else {
        print("Waiting for download to complete");
    }

    // and call itself after next timer
    Script.setTimeout(
        onRunAutoNext,
        timeStep
    );
}

var onKeyPressEventNextStep = function (event) {
    if (String.fromCharCode(event.key) == advanceKey.toUpperCase()) {
        if (!runNextStep()) {
            tearDownTest();
        }
    }
}

var onRunManual = function() {
    Window.displayAnnouncement(
        "Ready to run test " + currentTestName + "\n" +
        currentSteps.length + " steps\nPress " + "'" + advanceKey + "'" + " for next steps");
         
    Controller.keyPressEvent.connect(onKeyPressEventNextStep);
}

function isManualMode() {
    return (testMode === "manual");
}

var onRunAuto = function() {  
    // run the next step after next timer
    Script.setTimeout(
        onRunAutoNext,
        autoTimeStep
    );
}

// Add Steps to the test case
var doAddStep = function (name, stepFunction, snapshot) {
    currentSteps.push({"index": currentSteps.length, "name": name, "func": stepFunction, "snap": snapshot })
    print("PUSHING STEP" + currentSteps.length);
}

runOneTestCase = function(testCase, testType) {
    setUpTest(testCase);
    testCase.func(testType);
}

setUpTest = function(testCase) {
    // Setup origin
    originFrame = Vec3.sum(MyAvatar.position, ORIGIN_FRAME_OFFSET);

    currentStepIndex = 0;
    currentTestName = testCase.name;

    // resolvePath(".") returns a string that looks like "file:/" + <current folder>
    // We need the current folder
    var path = testCase.path.substring(testCase.path.indexOf(":") + 4);
    var pathParts = path.split("/");

    // Snapshots are saved in the user-selected folder
    // For a test running from D:/GitHub/hifi-tests/tests/content/entity/zone/create/tests.js
    // the tests are named tests.content.entity.zone.create.00000.jpg and so on
    // (assuming pathSeparator is ".")
    // Date and time are not used as part of the name, to keep the path lengths to a minimum
    // (the Windows API limit is 260 characters).
    //
    // Find location of "tests"
    var testsIndex;
    for (testsIndex = pathParts.length - 1; testsIndex > 0; --testsIndex) {
        if (pathParts[testsIndex] === "tests") {
            break;
        }
    }

    snapshotPrefix = pathParts[testsIndex];
    for (var i = testsIndex + 1; i < pathParts.length; ++i) {
        snapshotPrefix += pathSeparator + pathParts[i];
    }

    snapshotIndex = 0;

    // Setup validation camera
    var p0 = Vec3.sum(VALIDATION_CAMERA_OFFSET, Vec3.sum(MyAvatar.position, ORIGIN_FRAME_OFFSET));
    var q0 = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);

    if (testCase.usePrimaryCamera) {
        // Set the camera mode to independent
        previousCameraMode = Camera.mode;
        Camera.mode = "independent";
        
        Camera.setOrientation(q0);
        Camera.setPosition(p0);

        // The avatar is also pointed down the Z axis, so the test can be seen on-screen
        MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
        MyAvatar.headYaw =   0.0;
        MyAvatar.headPitch = 0.0;
        MyAvatar.headRoll =  0.0;
    } else {
        spectatorCameraConfig = Render.getConfig("SecondaryCamera");

        // Turn on secondary camera if not already on
        if (!spectatorCameraConfig.enabled) {
            secondaryCameraHasBeenEnabled = true;
            spectatorCameraConfig.enableSecondaryCameraRenderConfigs(true);
        }

        spectatorCameraConfig.resetSizeSpectatorCamera(1920, 1080);
        spectatorCameraConfig.vFoV = 45;
        Render.getConfig("SecondaryCameraJob.ToneMapping").curve = 0;
        Render.getConfig("SecondaryCameraJob.DrawHighlight").enabled = false;

        spectatorCameraConfig.orientation = q0;
        spectatorCameraConfig.position = p0;
    }


    // Hide the avatar
    MyAvatar.setEnableMeshVisible(false);

    if (typeof Test !== 'undefined') {
        // In command line mode, maximize window size 
        // (so that primary camera snapshots will have the correct size)
        Test.showMaximized();
    }

    if (!isManualMode()) {
        // Also, remove 2D overlays and mouse from the window, so that they won't appear in snapshots
        Menu.setIsOptionChecked("Show Overlays", false);
        Reticle.visible = false;
        Reticle.allowMouseCapture = false;
    }

    // Set callback for changes in download status.  This is used so we don't advance steps when data is downloading
    AccountServices.downloadInfoChanged.connect(onDownloadInfoChanged);
    AccountServices.updateDownloadInfo();

    // Enforce Desktop display (unless manual mode)
    if (!isManualMode()) {
        Menu.setIsOptionChecked("Desktop", true);
    }
}

tearDownTest = function() {
    // Clear the test case steps
    currentSteps = [];

   // Reset camera mode
    Camera.mode = previousCameraMode;

    if (isManualMode()) {
        // Disconnect key event
        Controller.keyPressEvent.disconnect(onKeyPressEventNextStep);
        Window.displayAnnouncement("Test " + currentTestName + " have been completed");
    }

    if (!isManualMode()) {
        //Restore 2D overlays and mouse from the window
        Menu.setIsOptionChecked("Show Overlays", true);
        Reticle.visible = true;
        Reticle.allowMouseCapture = true;
    }

    // Show the avatar
    MyAvatar.setEnableMeshVisible(true);

    if (isRecursive) {
        currentRecursiveTestCompleted = true;
    } else {
        // Just stop the script
        Script.stop();
    }

    // Turn secondary camera off if it was off before test
    if (secondaryCameraHasBeenEnabled) {
        spectatorCameraConfig.enableSecondaryCameraRenderConfigs(false);
    }

    // Disconnect callback
    AccountServices.downloadInfoChanged.disconnect(onDownloadInfoChanged);
}

validationCamera_setTranslation = function(position) {
    // The camera position is the sum of the origin frame, position (relative to that frame) and the eye (i.e. camera) offset
    var cameraPosition = Vec3.sum(originFrame, Vec3.sum(position, VALIDATION_CAMERA_OFFSET));

    if (currentTestCase.usePrimaryCamera) {
        Camera.setPosition(cameraPosition);
    } else {
        spectatorCameraConfig.position = cameraPosition;
    }
}

validationCamera_translate = function (offset) {
    if (currentTestCase.usePrimaryCamera) {
        Camera.setPosition(Vec3.sum(Camera.getPosition(), offset));
    } else {
        spectatorCameraConfig.position = Vec3.sum(spectatorCameraConfig.position, offset);
    }
}

validationCamera_setRotation = function (rotation) {
    var orientation = Quat.fromPitchYawRollDegrees(rotation.x, rotation.y, rotation.z);
    if (currentTestCase.usePrimaryCamera) {
        Camera.setOrientation(orientation);
    } else {
        spectatorCameraConfig.orientation = orientation;
    }
}

// The following are exported methods, accessible to test scripts

// Perform is the main method of a test
//      testName - name of the test
//      testPath - path the test is executing in
//      testMain - a function that creates the test
//
// The method creates a test case in currentTestCase.
// If the test mode is manual or auto then its execution is started
module.exports.perform = function (testName, testPath, validationCamera, testMain) {
    var usePrimaryCamera = (validationCamera === "primary");
    currentTestCase = new TestCase(testName, testPath, testMain, usePrimaryCamera);

    // Manual and auto tests are run immediately, recursive tests are stored in a queue
    if (isRecursive) {
        print("Not running yet - in recursive mode");
        testCases.push(currentTestCase);
    } else if (isManualMode()) {
        print("Begin manual test:" + testName);
        runOneTestCase(currentTestCase, "manual");
    } else { // testMode === "auto"
        print("Begin auto test:" + testName);
        runOneTestCase(currentTestCase, "auto");
    }
}

// Add steps to the test case, take snapshot if 3rd parameter is true
module.exports.addStep = function (name, stepFunction) {
    doAddStep(name, stepFunction, false);
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
    isRecursive = true;
    if (timeStep) {
        autoTimeStep = timeStep;
    }

    print("TEST MODE RECURSIVE SELECTED");
}

// Steps is an array of functions; each function being a test step
module.exports.runTest = function (testType) {
    // In recursive mode, this call is ignored during script load
    if (isRecursive && !runningRecursive) {
        return;
    }
    
    if (testType  === "auto") {
        onRunAuto();
    } else { // testType === "manual"
        onRunManual();
    }
}

module.exports.runRecursive = function () {
    print("Starting recursive tests");
    runningRecursive = true;

    currentRecursiveTestCompleted = true;
    Script.setInterval(
        function () {
            if (currentRecursiveTestCompleted) {
                currentRecursiveTestCompleted = false;
                if (testCases.length > 0) {
                    currentTestCase = testCases.pop();
                    runOneTestCase(currentTestCase, testMode);
                } else {
                    print("Recursive tests complete");
                    Script.stop();
                }
            }
        },
        1000
    );
}

// This is a position; the orientation is assumed to be looking down the Z axis, Y is up.
module.exports.getOriginFrame = function () {
    return originFrame;
}

// Utilities to provide GitHub repository path
var _repositoryPath;
module.exports.setRepositoryInfo = function (repositoryPath) {
    _repositoryPath = repositoryPath;
}

module.exports.getRepositoryPath = function () {
    return _repositoryPath;
}

module.exports.getTestsRootPath = function () {
    return _repositoryPath + "tests/";
}

module.exports.getUtilsRootPath = function () {
    return _repositoryPath + "tests/utils/";
}

module.exports.getAssetsRootPath = function () {
    return _repositoryPath + "assets/";
}
