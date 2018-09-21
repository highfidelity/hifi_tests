if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Show effects of opacity", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../matrix.js?raw=true")

    // List here all the entries of the Material Matrix tested in this test
    var TEST_CASES = [
        {name:"hifi_opacityV_NormalM_albedoM_ao",  a: -0.2, b: -1.0, c: -0.5},
        {name:"hifi_opacityM_NormalM_albedoM_ao",  a: -0.2, b:  0.0, c: -0.5},
        {name:"hifi_opacityA_NormalM_albedoM_ao",  a: -0.2, b:  1.0, c: -0.5},
      
        {name:"hifi_opacityV_albedoM_ao",          a: -0.2, b: -1.0, c:  0.5}
    ];

    var fxaaWasOn;
    autoTester.addStep("Turn off TAA for this test", function () {
        fxaaWasOn = Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff;
        Render.getConfig("RenderMainView.JitterCam").none();
        Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff = true;
    });

    // Add the test Cases
    var OFFSET = { x: 0.0, y: -0.8, z: -0.1 };
    var createdEntities = [];
    autoTester.addStep("Set up test case", function () {
        createdEntities = addCases(TEST_CASES, true, true, autoTester.getOriginFrame());
        validationCamera_translate(OFFSET);
    });
    autoTester.addStep("Wait for models to load");
    autoTester.addStepSnapshot("Take snapshot of the effects");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }

        if (!fxaaWasOn) {
            Render.getConfig("RenderMainView.JitterCam").play();
            Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff = false;
        }
    });

    var result = autoTester.runTest(testType);
});
