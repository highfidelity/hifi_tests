Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

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
    var OFFSET = { x: 0.0, y: -0.8, z: -0.1 };
    var createdEntities = [];
    autoTester.addStep("Set up test case", function () {
        createdEntities = addCases(TEST_CASES, true, true, autoTester.getOriginFrame());
        validationCamera_translate(OFFSET);
    });

    var fxaaWasOn;

    autoTester.addStep("Turn off TAA for this test", function () {
        fxaaWasOn = Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff;
        Render.getConfig("RenderMainView.JitterCam").none();
        Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff = true;
    });

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
