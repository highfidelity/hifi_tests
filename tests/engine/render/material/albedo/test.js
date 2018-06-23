Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/utils/branchUtils.js?raw=true");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Effects of albedo on various materials", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../matrix.js?raw=true")

    // List here all the entries of the Material Matrix tested in this test
    var TEST_CASES = [
        {name:"hifi_albedoV_ao",  a:0, b:-1, c:-0.5},
        {name:"hifi_albedoM_ao",  a:0, b:0, c:-0.5},
        {name:"hifi_albedoVM_ao",  a:0, b:1, c:-0.5},
      
        {name:"hifi_metallicV_albedoV_ao",  a:0, b:-1, c:0.5},
        {name:"hifi_metallicV_albedoM_ao",  a:0, b:0, c:0.5},
        {name:"hifi_metallicV_albedoVM_ao",  a:0, b:1, c:0.5},
    ];

    // Add the test Cases
    var OFFSET = { x: 0.0, y: -0.8, z: -0.1 };
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
