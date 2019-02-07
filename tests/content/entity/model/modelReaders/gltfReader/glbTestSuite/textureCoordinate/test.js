if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Read GLTF model", Script.resolvePath("."), "secondary", function(testType) {
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
        // https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/TextureCoordinateTest
        modelURL: assetsRootPath + 'models/gltf_models/glb/TextureCoordinateTest.glb',
        position: Vec3.sum(position, {x: 0.0, y: 0.75, z: -3.2 }),
        dimensions: Vec3.multiply(50.0, {x: 0.0198, y: 0.0195, z: 0.0202}),
        rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
        visible: true,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
    });

    createdEntities.push(testEntity);

    nitpick.addStepSnapshot("TextureCoordinateTest.glb Model is visible");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
