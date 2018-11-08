if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Read FBX model", Script.resolvePath("."), "secondary", function(testType) {
    var assetsRootPath = autoTester.getAssetsRootPath();
    var LIFETIME = 60.0;
    var position = autoTester.getOriginFrame();
	
    Script.include(autoTester.getUtilsRootPath() + "test_stage.js");

    var initData = {
        flags : { 
            hasKeyLight: true,
            hasAmbientLight: true
        },
        originFrame: position
    };
    var createdEntities = setupStage(initData);

    var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
    var MODEL_SCALE = 0.75;
    var MODEL_OFFSET = { x: 0.0, y: 0.7, z: -1.5};
    var objectName = "hifi_roughnessV00_metallicV_albedoV_ao";
    createdEntities.push(Entities.addEntity({
        lifetime: LIFETIME,
        type: "Model",
        modelURL: assetsRootPath + 'models/material_matrix_models/fbx/blender/' + objectName + '.fbx',
        name: objectName,
        position: Vec3.sum(MyAvatar.position, MODEL_OFFSET),    
        rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
        dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
        visible: true,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
    }));

    autoTester.addStepSnapshot("Model is visible");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});
