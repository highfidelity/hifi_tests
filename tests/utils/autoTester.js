

var currentTestName = "";
var currentTestRunning = false;
var currentSteps = [];
var currentStepIndex = 0;


module.exports.setupTest = function (combinedPath) {
    // Clear the test case steps
    currentSteps = [];
    currentStepIndex = 0;

    print("Setup test" + currentTestName);        
    
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
    var path = combinedPath.substring(combinedPath.indexOf(":") + 4);
    Snapshot.setSnapshotsLocation(path);

    var spectatorCameraConfig = Render.getConfig("SecondaryCamera");
    spectatorCameraConfig.enableSecondaryCameraRenderConfigs(true);
    spectatorCameraConfig.resetSizeSpectatorCamera(1920, 1080);
    spectatorCameraConfig.vFoV = 45;
    Render.getConfig("SecondaryCameraJob.ToneMapping").curve = 0;
    spectatorCameraConfig.orientation = MyAvatar.orientation;
    
    return spectatorCameraConfig;
}

var runOneStep = function (stepFunctor, stepIndex) {
    print("Running step " + (stepIndex + 1) + "/" + (currentSteps.length) +": " + stepFunctor.name);
    if (stepFunctor.func !== undefined) {
        stepFunctor.func();
    }

    if (stepFunctor.snap !== undefined && stepFunctor.snap) {
        print("Taking snapshot" + (stepIndex + 1) + "/" + (currentSteps.length));
        Window.takeSecondaryCameraSnapshot();
    }
}

var runNextStep = function () {
    // Run next step and increment only if there is one more
    if (currentStepIndex < currentSteps.length) {
        runOneStep(currentSteps[currentStepIndex], currentStepIndex);
        currentStepIndex++;
    }
    
    // Return true to go on or false if done
    return (currentStepIndex < currentSteps.length)
}

var testOver = function() {
    if (runningManual) {
        Controller.keyPressEvent.disconnect(onKeyPressEventNextStep);
        Window.alert("Test " + currentTestName + " have been completed");
    }
    //Window.message("Test " + currentTestName + " over");
    print("Test over " + currentTestName); 
    
    currentSteps = [];
    currentStepIndex = 0;
    currentTestName = "";      
    currentTestRunning = false;    

    Script.stop();
}

var onRunAuto = function() {
   
    // run the step...
    if (!runNextStep()) {
        testOver();       
    }

    // and call itself after next timer
    var STEP_TIME = 2000;   
    Script.setTimeout(
        function () {
            onRunAuto();
        },
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

var onRunStepByStep = function() {
    var messageBox;
    var closeButton = 0x00200000;
    function onMessageBoxClosed(id, button) {
        if (id === messageBox) {
            if (button === closeButton) {
                if (!runNextStep()) {
                    testOver();       
                }
                Controller.keyPressEvent.connect( onKeyPressEventNextStep );
            }
        }
    }
    Window.messageBoxClosed.connect(onMessageBoxClosed);

    messageBox = Window.openMessageBox(
        "Ready to run test " + currentTestName, 
        currentSteps.length + " steps\nPress [SPACE] for next steps",
        closeButton , closeButton);
/*
    Window.message(
            "Ready to run test " + currentTestName + "\n"
         + currentSteps.length + " steps\n" 
         + "Press [SPACE] for next steps");

    if (!runNextStep()) {
        testOver();       
    }
    Controller.keyPressEvent.connect( onKeyPressEventNextStep );*/
}

// Steps is an array of functions; each function being a test step
module.exports.runTest = function (testType) {
    if (testType  == "auto") {
        onRunAuto();
    } else { 
        onRunStepByStep();       
    }
}

// Add Steps to the test case
var doAddStep = function (name, stepFunction, snapshot) {
    currentSteps.push({"index": currentSteps.length, "name": name, "func": stepFunction, "snap": snapshot })
}

// Add Steps to the test case
module.exports.addStep = function (name, stepFunction, snapshot) {
    doAddStep(name, stepFunction, snapshot);
}

module.exports.addStepSnapshot = function (name, stepFunction) {
    doAddStep(name, stepFunction, true);
}


var runningManual = true;

module.exports.runManual = function () {
    return runningManual;
}

module.exports.enableAuto = function () {
    runningManual = false;
}


module.exports.perform = function (testName, testmain) {
    currentTestRunning = true;
    currentTestName = testName;

    if (runningManual) {     
        print("Begin manual test:" + testName);        
        testmain("stepbystep");
    } else {
        print("Begin auto test:" + testName);        
        testmain("auto");
    }
}

module.exports.testRunning = function () {
    return currentTestRunning;
}
