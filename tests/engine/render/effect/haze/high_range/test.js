if (typeof user === 'undefined') var user = "highfidelity/";var user = "highfidelity/";
if (typeof repository === 'undefined') var repository = "hifi_tests/";
if (typeof branch === 'undefined') var branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Haze - high range", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();

    // Test material matrix
    Script.include("../setup.js?raw=true")

    var HAZE = {
        hazeRange: 15000.0,
        hazeBaseRef: TEST_POSITION.y
    };

    // Setup
    var createdEntities = setup(HAZE,spectatorCameraConfig)

    autoTester.addStepSnapshot("Haze with high range - 15,000 mt");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});
