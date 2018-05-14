var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Point light", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();
    spectatorCameraConfig.position = { x: MyAvatar.position.x, y: MyAvatar.position.y, z: MyAvatar.position.z - 0.2 };

    // Test material matrix
    Script.include("../../../../utils/test_stage.js?raw=true")

    var createdEntities = setupStage()

    var properties = {
        lifetime: 120,  
        type: "Model",  
        name: "invalid url model",
        position: getStagePosOriAt(0, -1, 0).pos,
        modelURL: "asdf"
    };

    autoTester.addStep("Attempt to load model with invalid URL",
        function () {
            createdEntities.push(Entities.addEntity(properties));
        }
    );
    autoTester.addStepSnapshot("Result of invalid URL load");

    autoTester.addStep("Load model with valid URL", function () {
        //properties.modelURL = "https://github.com/highfidelity/hifi_tests/blob/master/assets/models/geometry/avatars/art3mis/art3mis.fst?raw=true";
        properties.modelURL = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/assets/models/geometry/avatars/art3mis/art3mis.fst";
        properties.position = getStagePosOriAt(0, 1, 0).pos;
        properties.name = "valid url model";

        createdEntities.push(Entities.addEntity(properties));
    });
    autoTester.addStepSnapshot("Model is loaded");
    
    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});
