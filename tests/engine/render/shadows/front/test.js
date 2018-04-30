var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Shadow - light in front", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();

    // Test material matrix
    Script.include("../setup.js?raw=true")
    
    // Add the test Cases
    var createdEntities = setup(20.0, 180.0);
    autoTester.addStep("Light source altitude: 20.0, azimuth: 180.0");

    autoTester.addStepSnapshot("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});
