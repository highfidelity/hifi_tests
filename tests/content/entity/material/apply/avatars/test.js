if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Apply Material Entities to Avatars", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest(true);
    spectatorCameraConfig.position = { x: MyAvatar.position.x, y: MyAvatar.position.y, z: MyAvatar.position.z - 0.6 };

    Script.include("../../../../../utils/test_stage.js?raw=true");

    // Add the test Cases
	var flags = { 
		hasAmbientLight: false
	};
    var createdEntities = setupStage(flags)

    var posOri = getStagePosOriAt(0, 0, 0);

    MyAvatar.orientation = Quat.fromVec3Degrees({x:0, y:180, z:0});

    var prevCameraMode = Camera.mode;
    Camera.mode = "mirror";

    var LIFETIME = 120;

    createdEntities.push(Entities.addEntity({
                  type: "Material",
                  materialURL: "materialData",
                  position: MyAvatar.position,
                  materialData: JSON.stringify({ "materials": {
                    "albedo": [0, 0, 1]
                  }}),
                  lifetime: LIFETIME,
                  priority: 1,
                  parentMaterialName: 2,
                  parentID: MyAvatar.SELF_ID
    }, true));
    
    autoTester.addStepSnapshot("Avatar without material");
    
    autoTester.addStep("Add material to avatar", function () {
        createdEntities.push(Entities.addEntity({
            type: "Material",
            materialURL: "materialData",
            position: MyAvatar.position,
            materialData: JSON.stringify({ "materials": {
            "albedo": [0, 0, 1]
            }}),
            lifetime: LIFETIME,
            priority: 1,
            parentMaterialName: 0,
            parentID: MyAvatar.SELF_ID
            }, true)
        );    
    });
    
    autoTester.addStepSnapshot("Display material on avatar");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }

        Camera.mode = prevCameraMode;
    });
    
    var result = autoTester.runTest(testType);
});