if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("effect - bloom", Script.resolvePath("."), "secondary", [["mid,high"]], function(testType) {

    // standard test stage and model loaders
    Script.include(nitpick.getUtilsRootPath() + "test_stageAndModels.js?raw=true")

    // List here all the entries of the Material Matrix tested in this test
    var TEST_CASES = [
        {name:"hifi_metallicV_albedoV_ao",  a:-1.5, b:0.0, c:0.9},  
    ];
    
    // Add the test Cases
    var OFFSET = { x: 0.0, y: 0.0, z: -0.1 };
    var createdEntities = [];
    // Add the test Cases
    var initData = {
        flags : { 
            hasZone: true,
            hasKeyLight: true,
            hasKeyLightShadow: true,
            hasAmbientLight: true,
            hasBloom: false,
            darkStage: true,
        },
        originFrame: nitpick.getOriginFrame()
    };

    // First step, setup scene
    nitpick.addStep("Set up test case", function () {
        createdEntities = addCases(TEST_CASES, initData);
        validationCamera_translate(OFFSET);
    });

    nitpick.addStepSnapshot("Bloom is off - no bloom should be visible");
        
    nitpick.addStep("Enable bloom", function () {
        print(JSON.stringify(Entities.getEntityProperties(createdEntities[0], ["bloom"])));
        Entities.editEntity(createdEntities[0], {
            bloomMode: "enabled",
            bloom: {
                bloomIntensity: 1.,
                bloomThreshold: 0.5,
                bloomSize: 1.0,
            }
        })
    });
    nitpick.addStepSnapshot("Bloom enabled");

    nitpick.addStep("Clean up",
        function () {
            for (var i = 0; i < createdEntities.length; i++) {
                Entities.deleteEntity(createdEntities[i]);
            }
        }
    );

    var result = nitpick.runTest(testType);
});
