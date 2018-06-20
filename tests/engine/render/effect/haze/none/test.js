Script.include("https://github.com/highfidelity/hifi_tests/blob/RC69/tests/utils/branchUtils.js?raw=true");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Haze - off", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../setup.js?raw=true")

    // Setup
    var createdEntities;
    autoTester.addStep("Setup", function () {
        createdEntities = setup(null, autoTester.getOriginFrame());
    });

    autoTester.addStepSnapshot("No haze");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = autoTester.runTest(testType);
});
