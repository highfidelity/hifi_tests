if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Read OBJ model with transparency", Script.resolvePath("."), "secondary", function(testType) {
    var assetsRootPath = nitpick.getAssetsRootPath();
    var LIFETIME = 60.0;

    var position = nitpick.getOriginFrame();
    position = Vec3.sum(position, { x: 0.0, y: 1.0, z: 0.0 });

    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");

    // Add the test Cases
    var initData = {
        flags : { 
            hasKeyLight: true,
            hasAmbientLight: true
        },
        originFrame: nitpick.getOriginFrame()
    };
    var createdEntities = setupStage(initData);

    // model
    createdEntities.push(Entities.addEntity({
        lifetime: LIFETIME,
        type: "Model",
        modelURL: assetsRootPath + 'models/obj_models/testTransparent.obj',
        position: Vec3.sum(position, {x: 0.0, y: 0.75, z: -2.2 }),   
        rotation: Quat.fromPitchYawRollDegrees(45.0, 45.0, 0.0),    
        visible: true,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
    }));

    nitpick.addStepSnapshot("Backdrop visible through holes in object");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
  
    var result = nitpick.runTest(testType);
});
