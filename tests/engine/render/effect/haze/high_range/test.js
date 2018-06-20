Script.include("https://github.com/highfidelity/hifi_tests/blob/RC69/tests/utils/branchUtils.js?raw=true");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Haze - high range", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../setup.js?raw=true")

    var HAZE = {
        hazeRange: 15000.0,
        hazeBaseRef: MyAvatar.position.y
    };

    // Setup
    var createdEntities;
    autoTester.addStep("Setup", function () {
        createdEntities = setup(HAZE, autoTester.getOriginFrame());
    });

    autoTester.addStepSnapshot("Haze with high range - 15,000 mt");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = autoTester.runTest(testType);
});
