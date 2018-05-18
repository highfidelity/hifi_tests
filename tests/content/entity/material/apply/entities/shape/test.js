var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Apply Material Entities to Shape Entities", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();
    spectatorCameraConfig.position = { x: MyAvatar.position.x, y: MyAvatar.position.y, z: MyAvatar.position.z - 0.2 };

    Script.include("../../../../../../utils/test_stage.js?raw=true");

    // Add the test Cases
	var flags = { 
		hasAmbientLight: false
	};
    var createdEntities = setupStage(flags)

    var posOri = getStagePosOriAt(0, 0, 0);

    var NUM_ROWS = 4;
    var LIFETIME = 120;

    function getPos(col, row) {
        var center = posOri.pos;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col * 0.2)), Vec3.multiply(Quat.getUp(MyAvatar.orientation), -(row - NUM_ROWS) * 0.2));
    }

    for (var i = 0; i <= NUM_ROWS; i++) {
        for (var j = 0; j <= NUM_ROWS; j++) {
            var pos = getPos(j - NUM_ROWS/2, i);
            var cube = Entities.addEntity({
                          type: "Box",
                          position: pos,
                          lifetime: LIFETIME,
                          dimensions: {x:0.2, y:0.2, z:0.2},
                          orientation: posOri.ori
            });
            createdEntities.push(cube);
            if (i != 0 || j != 0) {
                createdEntities.push(Entities.addEntity({
                              type: "Material",
                              materialURL: "materialData",
                              position: pos,
                              materialData: JSON.stringify({ "materials": {
                                "albedo": [i / NUM_ROWS, 0, j / NUM_ROWS]
                              }}),
                              priority: 1,
                              lifetime: LIFETIME,
                              parentID: cube
                }));
            }
        }
    }

    var fxaaWasOn;
    
    autoTester.addStep("Turn off TAA for this test", function () {
        fxaaWasOn = Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff;
        Render.getConfig("RenderMainView.JitterCam").none();
        Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff = true;
    });

    autoTester.addStepSnapshot("Display materials on multiple shapes");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
        
        if (!fxaaWasOn) {
            Render.getConfig("RenderMainView.JitterCam").play();
            Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff = false;
        }
    });
    
    var result = autoTester.runTest(testType);
});