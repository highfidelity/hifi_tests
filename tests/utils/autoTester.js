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

var runOneStep = function (stepFunction, stepIndex) {
    Window.takeSecondaryCameraSnapshot();
    print("Running step " + (stepIndex + 1));
    stepFunction();
}

var currentSteps = [];
var currentStepIndex = 0;

var runNextStep = function () {
    if (currentStepIndex < steps.length) {
        runOneStep(steps[currentStepIndex], currentStepIndex);
        currentStepIndex++;
        return true;
    } else {
        return false;
    }
}

var stepsOver

var onKeyPressEvent = function (event) {
    if (event.key == 32) {
        if (!runNextStep()) {
            Controller.keyPressEvent.disconnect(onKeyPressEvent);
            Window.alert("Tests have been completed");
            Script.stop();
//                        if (test.complete) {
//                            Window.alert("Tests have been completed");
//                        }
                     
        }
    }
}

// Steps is an array of functions; each function being a test step
module.exports.runTests = function (testType, steps) {
    if (testType  == "auto") {
        for (var i = 0; i < steps.length; ++i) {
            addStep(steps[i], i);
        }
    } else {
        var i = 0;
        Controller.keyPressEvent.connect( function(event){
                if (event.key == 32) {
                    runOneStep(steps[i], i);
                    i++;

                    i = Math.min(i, steps.length - 1);
                    
                    if (i == steps.length - 1) {
                        Controller.keyPressEvent.disconnect();
                        Window.alert("Tests have been completed");
                        Script.stop();
//                        if (test.complete) {
//                            Window.alert("Tests have been completed");
//                        }
                    
                    }
                }
            }
        );
    }
}

var runningManual = true;


module.exports.runManual = function () {
    return runningManual;
}

module.exports.enableAuto = function () {
    runningManual = false;
}

module.exports.perform = function (testmain) {
   if(runningManual) {     
        print("Begin manual test:");        
        testmain("stepbystep");
     //   Window.alert("Test Over");
   }
  // Window.alert("Test would run auto");
   
}

