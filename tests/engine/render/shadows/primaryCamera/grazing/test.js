if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Shadow - light at grazing angle from left", Script.resolvePath("."), "primary", function(testType) {
    // Setup the stage
    Script.include("../../setup.js?raw=true")

    // Add the test Cases
    var createdEntities = [];
    autoTester.addStep("Set up test case", function () {
        createdEntities = setup(5.0, 90.0, autoTester.getOriginFrame());
    });

    var wasAvatarVisible;
    autoTester.addStep("Show avatar if it is invisible (otherwise, shadows don't work correctly)", function () {
        wasAvatarVisible = MyAvatar.getEnableMeshVisible();
        if (!wasAvatarVisible) {
            MyAvatar.setEnableMeshVisible(true);
        }
    });

    autoTester.addStepSnapshot("Light source altitude: 5.0, azimuth: 90.0");

    autoTester.addStep("Clean up after test, hiding avatar if it wasn't visible", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }

        if (!wasAvatarVisible) {
            MyAvatar.setEnableMeshVisible(false);
        }
    });

    autoTester.runTest(testType);
});
