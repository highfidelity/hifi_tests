if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Show opacity blend map model", Script.resolvePath("."), "secondary", undefined, function(testType) {   
    // standard test stage and model loaders
    Script.include(nitpick.getUtilsRootPath() + "test_stageAndModels.js?raw=true")

    // List here all the entries of the Material Matrix tested in this test
    var TEST_CASES = [ 
       // {name:"hifi_albedoM_ao",  a:-1.5, b:-0.5, c:0},
        {name:"hifi_opacityA_albedoM_ao",  a:-1.5, b:-0.5, c:0},
        {name:"hifi_opacityA_albedoM_ao",  a:-1.5, b:0.5, c:0}, 
    ];
    
    // Add the test Cases
    var OFFSET = { x: 0.0, y: -0.8, z: -0.1 };
    var createdEntities = [];
    // Add the test Cases
    var initData = {
        flags : { 
            hasZone: true,
            hasKeyLight: true,
            hasKeyLightShadow: false,
            hasAmbientLight: true,
            hasLocalLights: true,
            hasBloom: false,
            darkStage: true,
        },
        originFrame: nitpick.getOriginFrame()
    };

    nitpick.addStep("Set up test case", function () {
        createdEntities = addCases(TEST_CASES, initData);
        validationCamera_translate(OFFSET);
    });

    nitpick.addDelay(6);
    nitpick.addStepSnapshot("Take snapshot of the effects");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
