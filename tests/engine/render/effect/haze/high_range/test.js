if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Haze - high range", Script.resolvePath("."), "secondary", undefined, undefined, function(testType) {
    // Test material matrix
    Script.include("../setup.js?raw=true")

    var HAZE = {
        hazeRange: 15000.0,
        hazeBaseRef: MyAvatar.position.y
    };

    // Setup
    var createdEntities;
    nitpick.addStep("Setup", function () {
        createdEntities = setup(HAZE, nitpick.getOriginFrame());
    });

    nitpick.addStepSnapshot("Haze with high range - 15,000 mt");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
