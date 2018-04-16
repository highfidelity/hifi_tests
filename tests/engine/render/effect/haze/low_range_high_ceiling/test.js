var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Haze - low range, high ceiling", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();

    // Test material matrix
    Script.include("../setup.js?raw=true")

    var HAZE = {
        hazeRange: 500.0,
        hazeBaseRef: TEST_POSITION.y+150.0,
        hazeAltitudeEffect: 1,
        hazeCeiling: TEST_POSITION.y+50.0
    };

    // Setup
    var createdEntities = setup(HAZE,spectatorCameraConfig)

    autoTester.addStepSnapshot("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});
