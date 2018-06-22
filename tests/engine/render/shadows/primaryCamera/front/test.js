Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Shadow - light in front", Script.resolvePath("."), "primary", function(testType) {
    // Test material matrix
    Script.include("../../setup.js?raw=true")

    // Add the test Cases
    var createdEntities = [];
    autoTester.addStep("Set up test case", function () {
        createdEntities = setup(20.0, 180.0, autoTester.getOriginFrame());
    });

    autoTester.addStepSnapshot("Light source altitude: 20.0, azimuth: 180.0");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = autoTester.runTest(testType);
});
