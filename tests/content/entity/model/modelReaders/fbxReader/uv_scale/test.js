if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));
Script.include(nitpick.getUtilsRootPath() + "test_stage.js");

nitpick.perform("Read FBX models with UV scale properties", Script.resolvePath("."), "secondary", function(testType) {
    var assetsRootPath = nitpick.getAssetsRootPath();
    var LIFETIME = 60.0;
    var position = MyAvatar.position;
    var createdEntities = [];
    var assetsRootPath = nitpick.getAssetsRootPath();
    
    var initData = { originFrame: nitpick.getOriginFrame() };
    var createdEntities = setupStage(initData);
    
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
    
    // Show three cubes. The ones on the sides should look the same, while the one in the middle should look different.
    
    // A cube with the texture image left unscaled. The texture was tiled manually by repeating the pattern in the texture image
    addEntityWithOffset(createdEntities, 'models/fbx_models/uv_scale/none/TiledTextureCube.fbx', { x: -1.5, y: 0.75, z: -4.0 });
    // A cube using the same texture image as the unscaled cube but the texture has arbitrary custom values for ModelUVScaling and ModelUVTranslation, so it should look different from the unscaled texture
    // Note that this is a baked fbx file (modifying oven seemed the easiest way to add the properties), however this should not influence the outcome.
    addEntityWithOffset(createdEntities, 'models/fbx_models/uv_scale/modeluvscaling/ModelUVScalingCube.baked.fbx', { x: 0.0, y: 0.75, z: -4.0 });
    // A cube with the FBX material (not to be confused with the texture) scaled automatically using Maya|uv_scale so it looks the same as the unscaled cube
    addEntityWithOffset(createdEntities, 'models/fbx_models/uv_scale/maya_material/MayaUVScaleCube.fbx', { x: 1.5, y: 0.75, z: -4.0 });

    nitpick.addDelay(8);
    nitpick.addStepSnapshot("FBX cube model texture scale comparison");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = nitpick.runTest(testType);
});
