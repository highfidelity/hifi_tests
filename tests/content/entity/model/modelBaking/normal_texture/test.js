if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));
Script.include(nitpick.getUtilsRootPath() + "test_stage.js");

nitpick.perform("Read FBX model with normal texture", Script.resolvePath("."), "secondary", function(testType) {
    var assetsRootPath = nitpick.getAssetsRootPath();
    var LIFETIME = 60.0;
    var position = MyAvatar.position;
    var createdEntities = [];
    var assetsRootPath = nitpick.getAssetsRootPath();
    
    var initData = { originFrame: nitpick.getOriginFrame() };
    var createdEntities = setupStage(initData);
    
    createdEntities.push(Entities.addEntity({
        lifetime: LIFETIME,
        type: "Zone",
        name: "zone",
        position: position,
        rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
        
        dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 }
    }));
    
    function addEntityWithOffset(createdEntities, assetPath, relativePosition) {
        createdEntities.push(Entities.addEntity({
            lifetime: LIFETIME,
            type: "Model",
            modelURL: assetsRootPath + assetPath,
            position: Vec3.sum(position, relativePosition),
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        }));
    }
    
    // Show a cube with just a normal texture
    addEntityWithOffset(createdEntities, 'models/model_baking/normal_texture/ModelUVScalingCube.baked.fbx', { x: 0.0, y: 0.75, z: -2.0 });

    nitpick.addDelay(8);
    nitpick.addStepSnapshot("FBX normal texture should be visible on an otherwise white model");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = nitpick.runTest(testType);
});
