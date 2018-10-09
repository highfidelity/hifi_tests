if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("SSAO - default", Script.resolvePath("."), "secondary", function(testType) {
    Script.include("../../setup.js?raw=true")

    var createdEntities;
    autoTester.addStep("Setup", function () {
        createdEntities = setup(autoTester.getOriginFrame());
        configureAO("horizonBased",  false);
    });
    autoTester.addStepSnapshot("Show default SSAO effect");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        finalize();
    });
    
    var result = autoTester.runTest(testType);
});
