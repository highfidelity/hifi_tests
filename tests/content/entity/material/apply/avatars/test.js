var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Apply Material Entities to Avatars", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest(true);
    spectatorCameraConfig.position = { x: MyAvatar.position.x, y: MyAvatar.position.y, z: MyAvatar.position.z - 0.6 };

    Script.include("../../../../../utils/test_stage.js?raw=true");

    // Add the test Cases
    var createdEntities = setupStage(true, false);

    var posOri = getStagePosOriAt(0, 0, 0);

    MyAvatar.orientation = Quat.fromVec3Degrees({x:0, y:180, z:0});

    var prevCameraMode = Camera.mode;
    Camera.mode = "mirror";

    var LIFETIME = 120;

    var previousSkeletonURL = MyAvatar.skeletonModelURL;
    MyAvatar.skeletonModelURL = "http://mpassets.highfidelity.com/0dce3426-55c8-4641-8dd5-d76eb575b64a-v1/Anime_F_Outfit.fst";

    createdEntities.push(Entities.addEntity({
                  type: "Material",
                  materialURL: "materialData",
                  position: MyAvatar.position,
                  materialData: JSON.stringify({ "materials": {
                    "albedo": [0, 0, 1]
                  }}),
                  lifetime: LIFETIME,
                  priority: 1,
                  parentMaterialName: 2
    }, true));

    autoTester.addStepSnapshot("Take snapshot");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        MyAvatar.skeletonModelURL = previousSkeletonURL;
        Camera.mode = prevCameraMode;
    });
    
    var result = autoTester.runTest(testType);
});