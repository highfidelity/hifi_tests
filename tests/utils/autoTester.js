module.exports.setupTests = function (combinedPath) {
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

var addStep = function (stepFunction, step) {
    var STEP_TIME = 2000;
    
    Script.setTimeout(
        function () {
            Window.takeSecondaryCameraSnapshot();
            stepFunction();
        },
        step * STEP_TIME
    );
    
    ++step;
}

var currentSteps = [];
var currentStepIndex = 0;

var runOneStep = function (stepFunction, stepIndex) {
    print("Running step " + (stepIndex + 1) + "/" + (currentSteps.length));
    stepFunction();

    print("Taking snapshot" + (stepIndex + 1) + "/" + (currentSteps.length));
    Window.takeSecondaryCameraSnapshot();
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
        Window.alert("Test have been completed");
    }
    print("Test over");            
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
        "Ready to run test", 
        currentSteps.length + " steps\nPress [SPACE] for next steps",
        closeButton , closeButton);
}

// Steps is an array of functions; each function being a test step
module.exports.runTests = function (testType, steps) {
    currentSteps = steps;
    currentStepIndex = 0;

    if (testType  == "auto") {
        onRunAuto();
    } else { 
        onRunStepByStep();       
    }
}

var runningManual = false;


module.exports.runManual = function () {
    return runningManual;
}

module.exports.enableAuto = function () {
    runningManual = false;
}

module.exports.perform = function (testmain) {
    if (runningManual) {     
        print("Begin manual test:");        
        testmain("stepbystep");
    } else {
        print("Begin auto test:");        
        testmain("auto");
    }  
}

