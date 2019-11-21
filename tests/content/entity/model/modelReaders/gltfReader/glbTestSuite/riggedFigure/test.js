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
        // https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/RiggedFigure
        modelURL: assetsRootPath + 'models/gltf_models/glb/RiggedFigure.glb',
        position: Vec3.sum(position, {x: 0.0, y: 0.8, z: -2.2 }),
        rotation: Quat.fromPitchYawRollDegrees(0.0, -20.0, 0.0),
        visible: true,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
    });

    createdEntities.push(testEntity);

    nitpick.addStep("Scale to 1m", function () {
        var properties = Entities.getEntityProperties(testEntity);
        var scale = Math.max(properties.dimensions.x, properties.dimensions.y, properties.dimensions.z);

        if (scale > 0) {
            Entities.editEntity(testEntity, { dimensions: { x: properties.dimensions.x / scale, y: properties.dimensions.y / scale, z: properties.dimensions.z / scale} });
        }
    });

    nitpick.addStepSnapshot("RiggedFigure.glb Model is visible");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
