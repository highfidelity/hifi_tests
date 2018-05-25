if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("LaserPointer faceAvatar test", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest(true);
    
    Script.include("../laserPointerUtils.js?raw=true");

    var lasers = [];
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.0, right)),
        direction: Vec3.normalize({x: 0, y: -1, z: 0}),
        filter: Picks.PICK_ENTITIES,
        renderStates: [{name: "one", start: start1, path: path1, end: end8}],
        faceAvatar: true,
        enabled: true
    }));
    Pointers.setRenderState(lasers[0], "one");

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

    var angle = 0;
    MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
    MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);

    autoTester.addStepSnapshot("1st position", function () {
        var angle = 1.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });

    autoTester.addStepSnapshot("2nd position", function () {
        var angle = 2.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });

    autoTester.addStepSnapshot("3rd position", function () {
        var angle = 3.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });

    autoTester.addStepSnapshot("4th position", function () {
        var angle = 4.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });

    autoTester.addStepSnapshot("Clean up after test", function () {
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
