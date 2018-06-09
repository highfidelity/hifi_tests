if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Show effects of roughness", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../matrix.js?raw=true")

    // List here all the entries of the Material Matrix tested in this test
    var TEST_CASES = [
        {name:"hifi_roughnessV00_albedoV_ao",  a:0, b:-2, c:-0.5},
        {name:"hifi_roughnessV25_albedoV_ao",  a:0, b:-1, c:-0.5},
        {name:"hifi_roughnessV50_albedoV_ao",  a:0, b:0, c:-0.5},
        {name:"hifi_roughnessV75_albedoV_ao",  a:0, b:1, c:-0.5},
        {name:"hifi_roughnessV100_albedoV_ao",  a:0, b:2, c:-0.5},

        {name:"hifi_roughnessV00_metallicV_albedoV_ao",  a:0, b:-2, c:0.5},
        {name:"hifi_roughnessV25_metallicV_albedoV_ao",  a:0, b:-1, c:0.5},
        {name:"hifi_roughnessV50_metallicV_albedoV_ao",  a:0, b:0, c:0.5},
        {name:"hifi_roughnessV75_metallicV_albedoV_ao",  a:0, b:1, c:0.5},
        {name:"hifi_roughnessV100_metallicV_albedoV_ao",  a:0, b:2, c:0.5},
    ];

    // Add the test Cases
    var OFFSET = { x: 0.0, y: -0.5, z: -0.1 };
    var createdEntities = [];
    autoTester.addStep("Set up test case", function () {
        createdEntities = addCases(TEST_CASES, true, true)
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
