//var autoTester = Script.require("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/autoTester.js" );
var autoTester = Script.require("../../../../../utils/autoTester.js" );

autoTester.perform("Point light", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();
    // Enabled draw zone bounding box and stack to visualize the stack of zone components
    //Render.getConfig("RenderMainView.DrawZoneStack").enabled = true

    // Test material matrix
    Script.include("../../../../../utils/test_stage.js?raw=true")

    // Add the test Cases
    var createdEntities = setupStage(false, false)

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
    
    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});

// clean up after test
/*Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
});*/
