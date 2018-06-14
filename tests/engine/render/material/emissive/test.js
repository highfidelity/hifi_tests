if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Show effects of emmisive materials", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../matrix.js?raw=true")

    // List here all the entries of the Material Matrix tested in this test
    var TEST_CASES = [
        {name:"hifi_emissiveV_albedoV_ao",  a:0, b:0, c:-0.5},
        {name:"hifi_emissiveM_albedoV_ao",  a:0, b:0, c:0.5},  
    ];

    // Add the test Cases
    var OFFSET = { x: 0.0, y: -1.0, z: -0.1 };
    var createdEntities = [];
    autoTester.addStep("Set up test case", function () {
        createdEntities = addCases(TEST_CASES, true, true, autoTester.getOriginFrame());
        validationCamera_translate(OFFSET);
    });
    autoTester.addStepSnapshot("Take snapshot of the effects");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = autoTester.runTest(testType);
});
