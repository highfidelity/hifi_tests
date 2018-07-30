if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Parabola ignore test", Script.resolvePath("."), "secondary", function(testType) {
    Script.include("../parabolaPointerUtils.js?raw=true");

    initializeTestData(autoTester.getOriginFrame());

    var NUM = 10;
    var origin = Vec3.sum(Vec3.sum(MyAvatar.position, Vec3.multiply(10, Vec3.FRONT)), Vec3.multiply(-NUM / 2, Vec3.RIGHT));
    var right = Vec3.RIGHT;
    var parabola = Pointers.createPointer(PickType.Parabola, {
        position: origin,
        direction: Vec3.normalize(Vec3.sum(right, Quat.getUp(MyAvatar.orientation))),
        filter: Picks.PICK_ENTITIES | Picks.PICK_OVERLAYS,
        speed: 7.0,
        accelerationAxis: {x: 0.0, y: -5.0, z: 0.0},
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        enabled: true
    });
    Pointers.setRenderState(parabola, "two");

    var entities = [];
    var overlays = [];
    for (var i = 0; i < NUM / 2; i++) {
        entities.push(Entities.addEntity({
            type: "Box",
            position: Vec3.sum(origin, Vec3.multiply(2 * i + 1, right)),
            dimensions: { x: 0.1, y: 10, z: 4 },
            color: { red: 255, green: 0, blue: 0 },
            visible: true
        }));

        var properties = {
            position: Vec3.sum(origin, Vec3.multiply(2 * i + 2, right)),
            color: { red: 0, green: 0, blue: 255 },
            dimensions: { x: 0.1, y: 10, z: 4 },
            solid: true,
            alpha: 1.0,
            visible: true,
            isVisibleInSecondaryCamera: true
        };
        overlays.push(Overlays.addOverlay("cube", properties));
    }

    autoTester.addStep("Move back to see all the objects", function () {
        var offset = { x: 0.0, y: 0.0, z: 2.0 };
        MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
        validationCamera_translate(offset);

        // Set all angles to 0
        var q0 = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
        MyAvatar.orientation = q0;

        MyAvatar.bodyYaw =   0.0;
        MyAvatar.bodyPitch = 0.0;
        MyAvatar.bodyRoll =  0.0;
        MyAvatar.headYaw =   0.0;
        MyAvatar.headPitch = 0.0;
        MyAvatar.headRoll =  0.0;

        Camera.setOrientation(q0);
    });
    autoTester.addStepSnapshot("Initial position");

    var ignore = [];
    var even = true;
    var index = -1;
    for (var i = 0; i < NUM; i++) {
        autoTester.addStep("Position " + i, function () {
            index++;
            if (even) {
                ignore.push(entities[index / 2]);
            } else {
                ignore.push(overlays[Math.floor(index / 2)]);
            }
            even = !even;
            print(JSON.stringify(ignore) + " " + index);
            Pointers.setIgnoreItems(parabola, ignore);
        });
        autoTester.addStepSnapshot("Position " + i);
    }

    autoTester.addStep("Clean up", function () {
        Pointers.removePointer(parabola);
        for (i = 0; i < entities.length; i++) {
            Entities.deleteEntity(entities[i]);
        }
        for (i = 0; i < overlays.length; i++) {
            Overlays.deleteOverlay(overlays[i]);
        }
        entities = [];
        overlays = [];
    });

    var result = autoTester.runTest(testType);
});
