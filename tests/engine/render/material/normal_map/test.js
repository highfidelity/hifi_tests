if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Show effects of normal maps", Script.resolvePath("."), "secondary", [["high.windows.amd", "tier.os.gpu"], ["high.windows.nvidia", "tier.os.gpu"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {
    // Test material matrix
    Script.include("../matrix.js?raw=true")

    // List here all the entries of the Material Matrix tested in this test
    var TEST_CASES = [
        {name:"hifi_normalM_albedoV_ao",  a:-1.5, b:-0.5, c:0},
        {name:"hifi_normalM_metallicV_albedoV_ao",  a:-1.5, b:0.5, c:0},  
    ];
    
    // Add the test Cases
    var OFFSET = { x: 0.0, y: -1.0, z: -0.1 };
    var createdEntities = [];
    nitpick.addStep("Set up test case", function () {
        createdEntities = addCases(TEST_CASES, true, true, nitpick.getOriginFrame());
        validationCamera_translate(OFFSET);
    });

    nitpick.addDelay(6);
    nitpick.addStepSnapshot("Take snapshot of the effects: Material Normal Map");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
