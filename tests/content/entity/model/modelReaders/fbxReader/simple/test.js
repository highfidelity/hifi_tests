if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Read FBX model", Script.resolvePath("."), "secondary", function(testType) {
    var assetsRootPath = nitpick.getAssetsRootPath();
    var LIFETIME = 60.0;
    var position = nitpick.getOriginFrame();
    var createdEntities = [];

    var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
    var MODEL_SCALE = 0.75;
    var MODEL_OFFSET = { x: 0.0, y: 1.7, z: -1.5};
    var objectName = "hifi_roughnessV00_metallicV_albedoV_ao";
    createdEntities.push(Entities.addEntity({
        lifetime: LIFETIME,
        type: "Model",
        modelURL: assetsRootPath + 'models/material_matrix_models/fbx/blender/' + objectName + '.fbx',
        name: objectName,
        position: Vec3.sum(position, MODEL_OFFSET),    
        rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
        dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
        visible: true,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
    }));

    createdEntities.push(Entities.addEntity({
        lifetime: LIFETIME,
        type: "Zone",
        name: "background",
        position: position,
        rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0 ),
        
        dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

        keyLightMode: "enabled",
        keyLight:{
            color: { "red": 255, "green": 255, "blue": 255 },
            intensity: 0.8,
            direction: {
                "x": 0.0,
                "y": 0.70710678118,
                "z": -0.70710678118
            }
        },

        skyboxMode: "enabled",
        skybox: {
            color: { red: 255, green: 255, blue: 255 },
            url: assetsRootPath + 'skymaps/YellowCube.jpg'
        },
            
        ambientLightMode: "enabled",
        ambientLight: {
            ambientURL: assetsRootPath + 'skymaps/RedCube.jpg'
        },

        hazeMode: "disabled",
        bloomMode: "disabled",
        shapeType: "box"
    }));

    nitpick.addStepSnapshot("Model is visible");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = nitpick.runTest(testType);
});
