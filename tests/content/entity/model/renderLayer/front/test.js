if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

// Create the material test model matrix
// Based on: https://raw.githubusercontent.com/highfidelity/hifi_tests/master/assets/models/material_matrix_models/material_matrix.js

nitpick.perform("Model Entity renderLayer front", Script.resolvePath("."), "secondary", [["high.windows.amd", "tier.os.gpu"], ["high.windows.nvidia", "tier.os.gpu"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {

    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");
    var LIFETIME = 200;

    var flags = {
        hasAmbientLight: true
    };
    var createdEntities = setupStage(flags, 200);

    var posOri = getStagePosOriAt(0, 0, 0);

    nitpick.addStep("Build the material matrix", function () {
        // List here all the entries of the Material Matrix
        var TEST_CASES = [
            {name:"hifi",     a:0, b:0},

            {name:"hifi-ao",  a:1, b:0},

            {name:"hifi_albedoV_ao",  a:2, b:0},
            {name:"hifi_albedoM_ao",  a:2, b:1},
            {name:"hifi_albedoVM_ao",  a:2, b:2},

            {name:"hifi_metallicV_albedoV_ao",  a:3, b:0},
            {name:"hifi_metallicV_albedoM_ao",  a:3, b:1},
            {name:"hifi_metallicV_albedoVM_ao",  a:3, b:2},

            {name:"hifi_metallicM_albedoV_ao",  a:4, b:0},
            {name:"hifi_metallicM_albedoM_ao",  a:4, b:1},

            {name:"hifi_roughnessV00_albedoV_ao",  a:5, b:0},
            {name:"hifi_roughnessV25_albedoV_ao",  a:5, b:1},
            {name:"hifi_roughnessV50_albedoV_ao",  a:5, b:2},
            {name:"hifi_roughnessV75_albedoV_ao",  a:5, b:3},
            {name:"hifi_roughnessV100_albedoV_ao",  a:5, b:4},

            {name:"hifi_roughnessV00_metallicV_albedoV_ao",  a:6, b:0},
            {name:"hifi_roughnessV25_metallicV_albedoV_ao",  a:6, b:1},
            {name:"hifi_roughnessV50_metallicV_albedoV_ao",  a:6, b:2},
            {name:"hifi_roughnessV75_metallicV_albedoV_ao",  a:6, b:3},
            {name:"hifi_roughnessV100_metallicV_albedoV_ao",  a:6, b:4},

            {name:"hifi_roughnessM_albedoV_ao",  a:7, b:0},
            {name:"hifi_roughnessM_metallicV_albedoV_ao",  a:7, b:1},

            {name:"hifi_normalM_albedoV_ao",  a:8, b:0},
            {name:"hifi_normalM_metallicV_albedoV_ao",  a:8, b:2},

            {name:"hifi_emissiveV_albedoV_ao",  a:9, b:0},
            {name:"hifi_emissiveM_albedoV_ao",  a:9, b:1},

            {name:"hifi_opacityV_albedoM_ao",  a:10, b:0}
        ];

        var assetsRootPath = nitpick.getAssetsRootPath();
        var MODEL_DIR_URL = assetsRootPath + "models/material_matrix_models/fbx/blender/";
        var MODEL_NAME_SUFFIX = ".fbx";
        var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
        var MODEL_Y_OFFSET = -0.1;
        var MODEL_SCALE = 0.3;

        function addTestEntity(name, position, orientation) {
          var newEntity = Entities.addEntity({
              type: "Model",
              modelURL: MODEL_DIR_URL + name + MODEL_NAME_SUFFIX,
              position: position,
              rotation: orientation,
              dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
              renderLayer: "front"
          });
          return newEntity;
        }

        function addTestCase(test, origin, orientation) {
            var unit = MODEL_SCALE * (MODEL_DIMS.x + MODEL_DIMS.z);
            var center = Vec3.sum(origin, Vec3.multiply(test.a * unit, Quat.getRight(orientation)));
            center = Vec3.sum(center, Vec3.multiply(test.b * unit, Quat.getUp(orientation)));
            createdEntities.push(addTestEntity(test.name, center, orientation));
        }

        function addCases(origin, orientation) {
            for (var i = 0; i < TEST_CASES.length; i++) {
                addTestCase(TEST_CASES[i], origin, orientation);
            }
        }

        var orientation = MyAvatar.orientation;
        orientation = Quat.safeEulerAngles(orientation);
        orientation.x = 0;
        orientation = Quat.fromVec3Degrees(orientation);

        var position = nitpick.getOriginFrame();
        position.y = position.y + 0.92;
        
        var root = Vec3.sum(
            Vec3.sum(position, Vec3.multiply(5, Quat.getForward(orientation))),
            Vec3.multiply(-5.5 * MODEL_SCALE * (MODEL_DIMS.x + MODEL_DIMS.z), Quat.getRight(orientation))
        );
        
        root = Vec3.sum(root, Vec3.multiply(MODEL_Y_OFFSET, Quat.getUp(orientation)));

        addCases(root, orientation);

        createdEntities.push(Entities.addEntity({
                type: "Box",
                position: Vec3.sum(Vec3.sum(position, Vec3.multiply(3, Quat.getFront(orientation))), Vec3.multiply(0.5, Vec3.UP)),
                visible: true,
                alpha: 1,
                orientation: orientation,
                dimensions: { x: 4, y: 2, z: 0.5},
        }));
    });

    nitpick.addDelay(10);
    nitpick.addStepSnapshot("Take snapshot of all the models");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});