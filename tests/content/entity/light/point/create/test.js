if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Point light", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include(autoTester.getUtilsRootPath() + "test_stage.js");

    // Add the test Cases
    var initData = {
        flags : { 
            hasKeyLight: false,
            hasAmbientLight: false
        },
        originFrame: autoTester.getOriginFrame()
    };
    var createdEntities = setupStage(initData);

    var posOri = getStagePosOriAt(6, 0, 0)

    // Define zone properties
    var properties = {
        lifetime: 120,  
        type: "light",  
        name: "test create light",
        position: posOri.pos,

        name: "light",
        type: "Light",
        isSpotlight: false,
        color: { red: 255, green: 255, blue: 255 },
        intensity: 1.0,
        falloffRadius: 3.0,
        dimensions: { x: 8.0, y: 8.0, z: 3.0 }, 
    };

    // Add the sphere and check its properties
    var light = Entities.addEntity(properties);
    createdEntities.push(light);

    properties = Entities.getEntityProperties(light);
    print("Light added :" + light);
    print(JSON.stringify(properties));

    createdEntities.push(light);

    //Add test steps, These may be called via the timing mechanism for auto-testing,
    // or stepped through with the space bar
    autoTester.addStep("Wait for entities to load");
    autoTester.addStepSnapshot("Display point light");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});
