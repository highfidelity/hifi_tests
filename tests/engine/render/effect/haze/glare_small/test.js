if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Haze - small glare", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../setup.js?raw=true")

    var HAZE = {
        hazeRange: 500.0,
        hazeBaseRef: MyAvatar.position.y,
        hazeColor: { red: 153, green: 107, blue: 47 },
        hazeEnableGlare: 1,
        hazeGlareColor: { red: 176, green: 25, blue: 68 },
        hazeGlareAngle: 5
    };

    // Setup
    var createdEntities;
    nitpick.addStep("Setup", function () {
        createdEntities = setup(HAZE, nitpick.getOriginFrame());
    });

    nitpick.addStepSnapshot("Show haze with small glare angle");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
