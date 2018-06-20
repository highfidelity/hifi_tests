Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/RC69/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Shadow - light at grazing angle from left", Script.resolvePath("."), "primary", function(testType) {
    // Test material matrix
    Script.include("../../setup.js?raw=true")

    // Add the test Cases
    var createdEntities = [];
    autoTester.addStep("Set up test case", function () {
        createdEntities = setup(5.0, 90.0, autoTester.getOriginFrame());
    });

    autoTester.addStepSnapshot("Light source altitude: 5.0, azimuth: 90.0");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = autoTester.runTest(testType);
});
