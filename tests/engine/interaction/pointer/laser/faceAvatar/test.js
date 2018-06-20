Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/RC69/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("LaserPointer faceAvatar test", Script.resolvePath("."), "primary", function(testType) {
    Script.include("../laserPointerUtils.js?raw=true");

    initializeTestData(autoTester.getOriginFrame());

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

    var prevCameraMode;

    autoTester.addStep("Set camera to first person mode", function () {
        prevCameraMode = Camera.mode;
        Camera.mode = "first person";
    });

    autoTester.addStep("Move to 1st position", function () {
        var angle = 0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });
    autoTester.addStepSnapshot("1st position");

    autoTester.addStep("Move to 2nd position", function () {
        var angle = 1.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });
    autoTester.addStepSnapshot("2nd position");

    autoTester.addStep("Move to 3rd position", function () {
        var angle = 2.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });
    autoTester.addStepSnapshot("3rd position");

    autoTester.addStep("Move to 4th position", function () {
        var angle = 3.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });
    autoTester.addStepSnapshot("4th position");

    autoTester.addStep("Move to 5th position", function () {
        var angle = 4.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });
    autoTester.addStepSnapshot("5th position");
    
    autoTester.addStep("Clean up after test", function () {
        // Restore avatar's pose
        var angle = 0.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);

        for (i = 0; i < lasers.length; i++) {
            Pointers.removePointer(lasers[i]);
        }
        for (i = 0; i < entities.length; i++) {
            Entities.deleteEntity(entities[i]);
        }
        lasers = [];
        entities = [];

        Camera.mode = prevCameraMode;
    });
    
    var result = autoTester.runTest(testType);
});
