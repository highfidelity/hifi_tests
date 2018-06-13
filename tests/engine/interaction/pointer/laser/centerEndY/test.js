if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Laser Pointer - from centre down Y axis", Script.resolvePath("."), "primary", function(testType) {
    Script.include("../laserPointerUtils.js?raw=true");

    var orientation = MyAvatar.orientation;
    var dir = Quat.getForward(orientation);
    dir.y = 0;
    var pos = Vec3.sum(Vec3.sum(MyAvatar.position, Vec3.multiply(2.0, Vec3.normalize(dir))), {x:0, y:0.5, z:0});
    var right = Quat.getRight(orientation);
    
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