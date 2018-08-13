if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Reticle control", Script.resolvePath("."), "primary", function(testType) {
    autoTester.addStep("Show reticle and position in fixed location", function () {
        Reticle.visible = true;
        Reticle.setPosition({ x: 960, y: 540 });
        Reticle.setScale(1.0);
    });
    autoTester.addStepSnapshot("Default reticle in centre of screen");

    autoTester.addStep("Set scaling to 10 (for large cursor)", function () {
        Reticle.setScale(10.0);
    });
    autoTester.addStepSnapshot("Large cursor");

    autoTester.addStep("Move cursor to right", function () {
        Reticle.setPosition({ x: 1440, y: 540 });
    });
    autoTester.addStepSnapshot("Reticle should have moved to the right");

    autoTester.addStep("Move cursor up", function () {
        Reticle.setPosition({ x: 1440, y: 270 });
    });
    autoTester.addStepSnapshot("Reticle should have moved up");

    autoTester.addStep("Hide reticle", function () {
        Reticle.visible = false;
    });
    autoTester.addStepSnapshot("No reticle should be displayed");

    autoTester.addStep("Show reticle", function () {
        Reticle.setScale(1.0);
        Reticle.visible = true;
    });
    autoTester.addStepSnapshot("Reticle should be displayed");

    autoTester.addStep("Cleanup");

    var result = autoTester.runTest(testType);
});
