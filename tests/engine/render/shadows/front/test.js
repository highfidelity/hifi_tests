if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Shadow - light in front", Script.resolvePath("."), "secondary",
function(testProfile) {
    // Only run on mid tier or higher, which uses deferred rendering and therefore supports shadows.
    return testProfile.tier > 1;
},
undefined,
function(testType) {
    // Test material matrix
    Script.include("../setup.js?raw=true")

    // Add the test Cases
    var createdEntities = [];
    nitpick.addStep("Set up test case", function () {
        createdEntities = setup(20.0, 180.0, nitpick.getOriginFrame());
    });

    nitpick.addDelay(3);
    nitpick.addStepSnapshot("Light source altitude: 20.0, azimuth: 180.0");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
