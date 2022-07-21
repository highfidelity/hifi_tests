if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("SSAO - high", Script.resolvePath("."), "primary", function(testType) {
    Script.include("../../setup.js?raw=true")

    var createdEntities;
    nitpick.addStep("Setup", function () {
        createdEntities = setup(nitpick.getOriginFrame());
        configureAO("horizonBased",  false);
        configureAO("resolutionLevel", 1);
        configureAO("ssaoRadius", 1.0);
        configureAO("ssaoNumSamples", 64);
    });
    nitpick.addStepSnapshot("Show high quality SSAO effect");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        finalize();
    });
    
    nitpick.runTest(testType);
});
