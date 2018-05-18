if (typeof user === 'undefined') var user = "highfidelity/";var user = "highfidelity/";
if (typeof repository === 'undefined') var repository = "hifi_tests/";
if (typeof branch === 'undefined') var branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Shadow - light at grazing angle from left", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();
	spectatorCameraConfig.position = { x: MyAvatar.position.x, y: MyAvatar.position.y, z: MyAvatar.position.z - 0.6 };

    // Test material matrix
    Script.include("../setup.js?raw=true")
    
    // Add the test Cases
    var createdEntities = [];
    autoTester.addStep("Set up test case", function () {
        createdEntities = setup(5.0, 90.0);
    });
    
    autoTester.addStepSnapshot("Light source altitude: 5.0, azimuth: 90.0");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});
