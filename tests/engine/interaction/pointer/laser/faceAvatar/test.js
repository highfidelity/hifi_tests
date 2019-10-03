if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("LaserPointer faceAvatar test", Script.resolvePath("."), "secondary", [["high", "tier"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {
    Script.include("../laserPointerUtils.js?raw=true");

    initializeTestData(nitpick.getOriginFrame());

    var lasers = [];
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, { x: 0.0, y: 0.3, z: 0.0 }), Vec3.multiply(0.0, right)),
        direction: Vec3.normalize({ x: 0, y: -1.0, z: 0.0 }),
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
        position: Vec3.sum(Vec3.sum(pos, { x: 0.0, y: -0.2, z: 0.0 }), Vec3.multiply(0.0, right)),
        dimensions: { x: 0.1, y: 0.1, z: 0.1 },
        lifetime: 300,
        rotation: orientation
    };
    entities.push(Entities.addEntity(properties));

    var prevCameraMode;

    nitpick.addStep("Set camera to first person mode", function () {
        prevCameraMode = Camera.mode;
        Camera.mode = "first person";
    });

	var RADIUS = 1.5;
    nitpick.addStep("Move to 1st position", function () {
        var angle = 0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(RADIUS * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });
    nitpick.addStepSnapshot("1st position");

    nitpick.addStep("Move to 2nd position", function () {
        var angle = 1.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(RADIUS * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });
    nitpick.addStepSnapshot("2nd position");

    nitpick.addStep("Move to 3rd position", function () {
        var angle = 2.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(RADIUS * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });
    nitpick.addStepSnapshot("3rd position");

    nitpick.addStep("Move to 4th position", function () {
        var angle = 3.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(RADIUS * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });
    nitpick.addStepSnapshot("4th position");

    nitpick.addStep("Move to 5th position", function () {
        var angle = 4.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(RADIUS * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    });
    nitpick.addStepSnapshot("5th position");
    
    nitpick.addStep("Clean up after test", function () {
        // Restore avatar's pose
        var angle = 0.0 * 3.1416 / 5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(RADIUS * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
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
    
    var result = nitpick.runTest(testType);
});
