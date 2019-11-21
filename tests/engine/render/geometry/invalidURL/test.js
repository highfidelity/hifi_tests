if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Attempt to access invalid URL", Script.resolvePath("."), "secondary", [["high.windows.amd", "tier.os.gpu"], ["high.windows.nvidia", "tier.os.gpu"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {
    // Test material matrix
    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");

    var initData = { originFrame: nitpick.getOriginFrame() };
    var createdEntities = setupStage(initData);

    var assetsRootPath = nitpick.getAssetsRootPath();

    var properties = {
        lifetime: 120,  
        type: "Model",  
        name: "invalid url model",
        position: getStagePosOriAt(0, -1, 0).pos,
        modelURL: "asdf"
    };

    nitpick.addStep("Attempt to load model with invalid URL",
        function () {
            createdEntities.push(Entities.addEntity(properties));
        }
    );

    nitpick.addDelay(6);

    nitpick.addStepSnapshot("Result of invalid URL load");

    nitpick.addStep("Load model with valid URL", function () {
        properties.modelURL = assetsRootPath + "models/geometry/avatars/art3mis/art3mis.fst";
        properties.position = getStagePosOriAt(0, 1, 0).pos;
        properties.name = "valid url model";

        createdEntities.push(Entities.addEntity(properties));
    });
    nitpick.addStepSnapshot("Model is loaded");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});