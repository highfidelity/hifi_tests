if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Read GLTF model", Script.resolvePath("."), "secondary", [["high", "tier"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {
    var assetsRootPath = nitpick.getAssetsRootPath();
    var LIFETIME = 60.0;
    var position = nitpick.getOriginFrame();

    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");

    var initData = {
        flags : {
          hasKeyLight: true,
          hasAmbientLight: true,
          hasKeyLightShadow: true,
        },
        originFrame: nitpick.getOriginFrame()
    };
    var createdEntities = setupStage(initData);

    var testEntity = Entities.addEntity({
        lifetime: LIFETIME,
        type: "Model",
        // https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Box
        modelURL: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Embedded/Box.gltf',
        position: Vec3.sum(position, {x: 0.0, y: 0.75, z: -3.2 }),
        rotation: Quat.fromPitchYawRollDegrees(0.0, -25.0, 0.0),
        visible: true,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
    });

    createdEntities.push(testEntity);

    nitpick.addStepSnapshot("Box.gltf Model is visible");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
