if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("LOD test", Script.resolvePath("."), "secondary", function(testType) {
    Script.include(autoTester.getUtilsRootPath() + "test_stage.js");

    // Add the test Cases
    var flags = { 
        hasAmbientLight: false
    };

    var createdEntities = setupStage(flags)
    var createdOverlays = [];

    var posOri = getStagePosOriAt(1, 0, 0);

    var LIFETIME = 120;
    var DIM = {x: 1.0, y: 1.2, z: 0.28};

    var assetsRootPath = autoTester.getAssetsRootPath();

    createdOverlays.push(Overlays.addOverlay("model", {
        position: Vec3.sum(posOri.pos, Vec3.multiply(-0.5, Quat.getRight(posOri.ori))),
        lifetime: LIFETIME,
        url: Script.resolvePath(assetsRootPath + "models/geometry/avatars/kaya/Kaya.fbx"),
        dimensions: DIM,
        orientation: posOri.ori,
        isGroupCulled: false,
        isVisibleInSecondaryCamera: true
    }));

    createdOverlays.push(Overlays.addOverlay("model", {
        position: Vec3.sum(posOri.pos, Vec3.multiply(0.5, Quat.getRight(posOri.ori))),
        lifetime: LIFETIME,
        url: Script.resolvePath(assetsRootPath + "models/geometry/avatars/kaya/Kaya.fbx"),
        dimensions: DIM,
        orientation: posOri.ori,
        isGroupCulled: true,
        isVisibleInSecondaryCamera: true
    }));

    LODManager.setAutomaticLODAdjust(false);
    LODManager.setOctreeSizeScale(32768 * 400);

    autoTester.addStepSnapshot("Everything is visible");

    autoTester.addStep("Set LOD to 50", function () {
        LODManager.setOctreeSizeScale(32768 * 50);
    });
    autoTester.addStepSnapshot("Backdrop partially visible");

    autoTester.addStep("Set LOD to 10", function () {
        LODManager.setOctreeSizeScale(32768 * 10);
    });
    autoTester.addStepSnapshot("Just both models visible (in secondary)");

    autoTester.addStep("Set LOD to 8.5", function () {
        LODManager.setOctreeSizeScale(32768 * 8.5);
    });
    autoTester.addStepSnapshot("Only right model visible (in secondary)");

    autoTester.addStep("Clean up", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        for (var i = 0; i < createdOverlays.length; i++) {
            Overlays.deleteOverlay(createdOverlays[i]);
        }

        LODManager.setOctreeSizeScale(32768 * 400);
        LODManager.setAutomaticLODAdjust(true);
    });

    autoTester.runTest(testType);
});