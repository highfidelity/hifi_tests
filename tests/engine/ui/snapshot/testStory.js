if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));
Script.include(nitpick.getUtilsRootPath() + "test_stage.js");

nitpick.perform("Test snapshot with no snap directory set", Script.resolvePath("."), "secondary", undefined, undefined, function(testType) {
    
    var oldSnapshotsLocation;
    
    function cleanup() {
        if (oldSnapshotsLocation != undefined) {
            Snapshot.setSnapshotsLocation(oldSnapshotsLocation);
            oldSnapshotsLocation = undefined;
        }
    }
    
    Script.scriptEnding.connect(cleanup);
    
    function clearSnapshotsLocation() {
        if (oldSnapshotsLocation == undefined) {
            oldSnapshotsLocation = Snapshot.getSnapshotsLocation();
        }
        Snapshot.setSnapshotsLocation("");
    }
    
    nitpick.addStep("Primary Camera Snapshot", function () {
        clearSnapshotsLocation();
        Window.takeSnapshot();
    });
    
    nitpick.addStep("Primary Camera Snapshot and GIF", function () {
        clearSnapshotsLocation();
        Window.takeSnapshot(true, true);
    });
    
    nitpick.addStep("Secondary Camera Snapshot", function () {
        clearSnapshotsLocation();
        var secondaryCamera = Render.getConfig("SecondaryCamera");
        secondaryCamera.position = Camera.position;
        secondaryCamera.orientation = Camera.orientation;
        
        Window.takeSecondaryCameraSnapshot();
    });
    
    nitpick.addStep("Secondary Camera 360 Snapshot", function () {
        clearSnapshotsLocation();
        var secondaryCamera = Render.getConfig("SecondaryCamera");
        secondaryCamera.position = Camera.position;
        secondaryCamera.orientation = Camera.orientation;
        Window.takeSecondaryCamera360Snapshot(MyAvatar.position);
    });
    
    nitpick.addStep("Clean up after test", function () {
        cleanup();
    });
    
    var result = nitpick.runTest(testType);
});
