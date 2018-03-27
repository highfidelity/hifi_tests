var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://raw.githubusercontent.com/" + user + repository + branch + "tests/utils/autoTester.js");

autoTester.perform("Zone create", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();

    Script.include("../laserPointerUtils.js?raw=true");

    var lasers = [];
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.0, right)),
        direction: Vec3.normalize({x: 0, y: -1, z: 0}),
        filter: Picks.PICK_ENTITIES,
        renderStates: renderStates,
        centerEndY: false,
        enabled: true
    }));
    Pointers.setRenderState(lasers[0], "five");

    var entities = [];
    var properties = {
        type: "Shape",
        shape: "Cube",
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(0.0, right)),
        dimensions: {x: 0.1, y: 0.1, z: 0.1},
        lifetime: 300,
        rotation: orientation
    };
    entities.push(Entities.addEntity(properties));

    autoTester.addStepSnapshot("Running LaserPointer centerEndY test");

    autoTester.addStep("Clean up after test", function () {
        for (i = 0; i < lasers.length; i++) {
            Pointers.removePointer(lasers[i]);
        }
        for (i = 0; i < entities.length; i++) {
            Entities.deleteEntity(entities[i]);
        }
        lasers = [];
        entities = [];
    });
    
    var result = autoTester.runTest(testType);
});