var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Shadow - light on top", Script.resolvePath("."), function(testType) {
//    Script.setTimeout(function () { Test.quit(); }, 20 * 1000);
//    Window.location = "localhost/8000,8000,8000/0,0.0,0.0,1.0";
//    Test.wait(7 * 1000);

    var spectatorCameraConfig = autoTester.setupTest();

    // Test material matrix
    Script.include("../setup.js?raw=true")
    
    // Add the test Cases
    var createdEntities = setup(80.0, -60.0);
    autoTester.addStep("Light source altitude: 80.0, azimuth: -60.0");

    autoTester.addStepSnapshot("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});
