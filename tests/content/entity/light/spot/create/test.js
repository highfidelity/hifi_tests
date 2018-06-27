if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Spot light", Script.resolvePath("."), "secondary", function(testType) {
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

    var posOri = getStagePosOriAt(6.9, 0, 4)
    var lightOri = Quat.multiply(Quat.fromPitchYawRollDegrees(-90, 0, 0), posOri.ori);

    // Define zone properties
    var properties = {
        lifetime: 120,  
        type: "light",  
        name: "test create spot light",
        position: posOri.pos,
        rotation: lightOri,

        type: "Light",
        isSpotlight: true,
        color: { red: 255, green: 255, blue: 255 },
        intensity: 2.0,
        falloffRadius: 6.0,
        exponent: 0.1,
        cutoff: 45,
        dimensions: { x: 8.0, y: 8.0, z: 12.0 }, 
    };

    // Add the sphere and check its properties
    var light = Entities.addEntity(properties);
    createdEntities.push(light);

    var posOri2 = getStagePosOriAt(6.9, 4, 4)
    var lightOri2 = Quat.multiply(Quat.fromPitchYawRollDegrees(-45, 90, 0), posOri.ori);

    properties = {
        lifetime: 120,  
        type: "light",  
        name: "test create spot light",
        position: posOri2.pos,
        rotation: lightOri2,
    
        type: "Light",
        isSpotlight: true,
        color: { red: 255, green: 125, blue: 255 },
        intensity: 2.0,
        falloffRadius: 6.0,
        exponent: 1,
        cutoff: 20,
        dimensions: { x: 8.0, y: 8.0, z: 12.0 }, 
    };
    createdEntities.push(Entities.addEntity(properties));

    properties = Entities.getEntityProperties(light);
    print("Light added :" + light);
    print(JSON.stringify(properties));

    createdEntities.push(light);

    //Add test steps, These may be called via the timing mechanism for auto-testing,
    // or stepped through with the space bar
    autoTester.addStep("Wait for entities to load");
    autoTester.addStepSnapshot("Display the 2 spotlights");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});

