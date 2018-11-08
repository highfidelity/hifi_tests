if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Haze - low range, low ceiling, high base (inverted haze)", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../setup.js?raw=true")

    var HAZE = {
        hazeRange: 500.0,
        hazeBaseRef: MyAvatar.position.y + 150.0,
        hazeAltitudeEffect: 1,
        hazeCeiling: MyAvatar.position.y
    };

    // Setup
    var createdEntities;
    nitpick.addStep("Setup", function () {
        createdEntities = setup(HAZE, nitpick.getOriginFrame());
    });

    nitpick.addStepSnapshot("Haze with low range, low ceiling and high base");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
