module.exports.setupSnapshots = function (combinedPath) {
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

// Steps is an array of functions; each function being a test step
module.exports.createTest = function (testType, steps) {
    if (testType  == "auto") {
        for (var i = 0; i < steps.length; ++i) {
            addStep(steps[i], i);
        }
    } else {
        var i = 0;
        Controller.keyPressEvent.connect(
            function(event){
                if (event.key == 32) {
                    print("Running step " + (i + 1));
                    steps[i++]();
                    i = Math.min(i, steps.length - 1);
                }
            }
        );
    }
}