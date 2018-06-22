Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Point light", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../../../../../utils/test_stage.js?raw=true")

    // Add the test Cases
	var flags = { 
		hasKeyLight: false,
		hasAmbientLight: false
	};
    var createdEntities = setupStage(flags, undefined, autoTester.getOriginFrame());

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
