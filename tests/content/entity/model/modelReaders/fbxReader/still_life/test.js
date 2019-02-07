if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Read still life FBX model", Script.resolvePath("."), "secondary", function(testType) {
    var assetsRootPath = nitpick.getAssetsRootPath();
    var LIFETIME = 60.0;

    var position = nitpick.getOriginFrame();
    position = Vec3.sum(position, { x: 0.0, y: 1.0, z: 0.0 });

    var createdEntities = [];
    var assetsRootPath = nitpick.getAssetsRootPath();

    createdEntities.push(Entities.addEntity({
        lifetime: LIFETIME,
        type: "Zone",
        name: "zone",
        position: position,
        rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0 ),
    
        dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

        keyLightMode: "enabled",
        keyLight:{
            color: { "red": 255, "green": 255, "blue": 255 },
            intensity: 0.8,
            direction: {
                "x": 0.0,
                "y": -0.70710678118,
                "z": -0.70710678118
            }
        },

        skyboxMode: "enabled",
        skybox: {
            color: { "red": 255,"green": 255,"blue": 255 },
            url: assetsRootPath + 'skymaps/YellowCube.jpg'
        },

        ambientLightMode: "disabled",
        hazeMode: "disabled",
        bloomMode: "disabled",
        shapeType: "box"
    }));

    createdEntities.push(Entities.addEntity({
        lifetime: LIFETIME,
        type: "Model",
        modelURL: assetsRootPath + 'models/fbx_models/nectarines_peaches/Nectarins-peaches.FBX',
        position: Vec3.sum(position, { x: 0.0, y: 0.75, z: -3.0 }),
        rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
        dimensions: { x: 3.179812, y: 1.111562, z: 2.7097855 },
        visible: true,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
    }));

    nitpick.addDelay(8);
    nitpick.addStepSnapshot("Still life FBX model");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
