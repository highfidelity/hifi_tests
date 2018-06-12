if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

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
        var offset = { x: 0.0, y: -1.0, z: 0.0 };
        createdEntities = setup(HAZE, Vec3.sum( autoTester.getOriginFrame(), offset);
        validationCamera_translate(offset);
    });

    autoTester.addStepSnapshot("Haze with high range - 15,000 mt");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = autoTester.runTest(testType);
});
