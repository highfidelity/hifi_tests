if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("LOD test", Script.resolvePath("."), "secondary", function(testType) {
    var createdOverlays = [];

    var LIFETIME = 120;
    var DIM = {x: 1.0, y: 1.2, z: 0.28};

    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    
    var pos = autoTester.getOriginFrame();
    var ori = MyAvatar.orientation;

    validationCamera_setRotation({ x: 0.0, y: 0.0, z: 0.0 });
    validationCamera_setTranslation({ x: 0.0, y: 0.0, z: 0.0 });
    
    // Create line of models
    var assetsRootPath = autoTester.getAssetsRootPath();
    var URL = Script.resolvePath(assetsRootPath + "models/geometry/avatars/kaya/Kaya.fbx");
    for (var i = 0; i < 8; ++i) {
        createdOverlays.push(Overlays.addOverlay("model", {
            position: Vec3.sum(Vec3.sum(pos, Vec3.multiply(0.75, Quat.getUp(ori))), Vec3.multiply(2.0 + 4.0 * i, Quat.getForward(ori))),
            lifetime: LIFETIME,
            url: URL,
            dimensions: DIM,
            orientation: ori,
            isGroupCulled: false,
            isVisibleInSecondaryCamera: true
        }));
    }
    
    LODManager.setAutomaticLODAdjust(false);
    LODManager.setOctreeSizeScale(32768 * 400);

    autoTester.addStepSnapshot("8 models visible");

    autoTester.addStep("Set LOD to 30", function () {
        LODManager.setOctreeSizeScale(32768 * 30);
    });
    autoTester.addStepSnapshot("4 models visible");

    autoTester.addStep("Set LOD to 10", function () {
        LODManager.setOctreeSizeScale(32768 * 10);
    });
    autoTester.addStepSnapshot("Only one model visible");

    autoTester.addStep("Clean up", function () {
        for (var i = 0; i < createdOverlays.length; i++) {
            Overlays.deleteOverlay(createdOverlays[i]);
        }

        LODManager.setOctreeSizeScale(32768 * 400);
        LODManager.setAutomaticLODAdjust(true);
    });

    autoTester.runTest(testType);
});