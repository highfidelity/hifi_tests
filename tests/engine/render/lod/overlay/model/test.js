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
    createdOverlays.push(Overlays.addOverlay("model", {
        position: Vec3.sum(Vec3.sum(Vec3.sum(pos, Vec3.multiply(1.6, Quat.getUp(ori))), Vec3.multiply(-0.5, Quat.getRight(ori))), Vec3.multiply(2.8, Quat.getForward(ori))),
        lifetime: LIFETIME,
        url: URL,
        dimensions: DIM,
        orientation: ori,
        isGroupCulled: false,
        isVisibleInSecondaryCamera: true
    }));

    createdOverlays.push(Overlays.addOverlay("model", {
        position: Vec3.sum(Vec3.sum(Vec3.sum(pos, Vec3.multiply(1.6, Quat.getUp(ori))), Vec3.multiply(0.5, Quat.getRight(ori))), Vec3.multiply(2.8, Quat.getForward(ori))),
        lifetime: LIFETIME,
        url: URL,
        dimensions: DIM,
        orientation: ori,
        isGroupCulled: true,
        isVisibleInSecondaryCamera: true
    }));
    
    LODManager.setAutomaticLODAdjust(false);
    LODManager.setOctreeSizeScale(32768 * 400);

    autoTester.addStepSnapshot("Both models visible");

    autoTester.addStep("Set LOD to 10", function () {
        LODManager.setOctreeSizeScale(32768 * 10);
    });
    autoTester.addStepSnapshot("Eyes of left model cannot be seen");

    autoTester.addStep("Set LOD to 5.8", function () {
        LODManager.setOctreeSizeScale(32768 * 5.8);
    });
    autoTester.addStepSnapshot("Only right model visible, including eyes");


    autoTester.addStep("Set LOD to 4", function () {
        LODManager.setOctreeSizeScale(32768 * 4);
    });
    autoTester.addStepSnapshot("No models are visible");

    autoTester.addStep("Clean up", function () {
        for (var i = 0; i < createdOverlays.length; i++) {
            Overlays.deleteOverlay(createdOverlays[i]);
        }

        LODManager.setOctreeSizeScale(32768 * 400);
        LODManager.setAutomaticLODAdjust(true);
    });

    autoTester.runTest(testType);
});