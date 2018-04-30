var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Point light", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();
    spectatorCameraConfig.position = { x: MyAvatar.position.x, y: MyAvatar.position.y, z: MyAvatar.position.z - 0.2 };

    // Test material matrix
    Script.include("../../../../../utils/test_stage.js?raw=true")

    // Add the test Cases
	var flags = { 
		hasZone: true,
		hasKeyLight: false,
		hasAmbient: false,
		hasLocalLights: false
	};
    var createdEntities = setupStage(flags)

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
