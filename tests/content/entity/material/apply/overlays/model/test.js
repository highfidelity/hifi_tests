var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Apply Material Entities to Model Overlays", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest(true);
    spectatorCameraConfig.position = { x: MyAvatar.position.x, y: MyAvatar.position.y, z: MyAvatar.position.z - 1.2 };

    Script.include("../../../../../../utils/test_stage.js?raw=true");

    // Add the test Cases
	var flags = { 
		hasAmbientLight: false
	};
    var createdEntities = setupStage(flags)

    var createdOverlays = [];

    var posOri = getStagePosOriAt(1, 0, 0);

    var NUM_ROWS = 2;
    var LIFETIME = 120;

    var DIM = {x: 0.7, y: 0.8, z: 0.14};

    function getPos(col, row) {
        var center = posOri.pos;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col * DIM.x)), Vec3.multiply(Quat.getUp(MyAvatar.orientation), -(row - NUM_ROWS) * DIM.y));
    }

    for (var i = 0; i <= NUM_ROWS; i++) {
        for (var j = 0; j <= NUM_ROWS; j++) {
            var pos = getPos(j - NUM_ROWS/2, i + 0.5);
            var model = Overlays.addOverlay("model", {
                          position: pos,
                          lifetime: LIFETIME,
                          url: "http://mpassets.highfidelity.com/0dce3426-55c8-4641-8dd5-d76eb575b64a-v1/Anime_F_Outfit.fst",
                          dimensions: DIM,
                          orientation: posOri.ori
            });
            createdOverlays.push(model);
            if (i != 0 || j != 0) {
                var props = {
                              type: "Material",
                              materialURL: "materialData",
                              position: pos,
                              materialData: JSON.stringify({ "materials": {
                                "albedo": [i / NUM_ROWS, 0, j / NUM_ROWS ]
                              }}),
                              lifetime: LIFETIME,
                              priority: 1,
                              parentID: model
                }
                if (i == 1) {
                    props.parentMaterialName = j;
                } else if (i == 2) {
                    props.parentMaterialName = "mat::" + "StingrayPBS" + (j + 1);
                }
                createdEntities.push(Entities.addEntity(props));
            }
        }
    }

    autoTester.addStepSnapshot("Display materials on multiple model overlays");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        for (var i = 0; i < createdOverlays.length; i++) {
            Overlays.deleteOverlay(createdOverlays[i]);
        }
    });
    
    var result = autoTester.runTest(testType);
});