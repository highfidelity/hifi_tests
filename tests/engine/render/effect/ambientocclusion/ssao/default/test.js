if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("SSAO - default", Script.resolvePath("."), "primary", function(testType) {
    Script.include("../../setup.js?raw=true")

    var createdEntities;
    nitpick.addStep("Setup", function () {
        createdEntities = setup(nitpick.getOriginFrame());
        configureAO("horizonBased",  false);
    });
    nitpick.addStepSnapshot("Show default SSAO effect");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        finalize();
    });
    
    nitpick.runTest(testType);
});
