if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Parabola lockEnd test", Script.resolvePath("."), "secondary", function(testType) {
    Script.include("../parabolaPointerUtils.js?raw=true");

    initializeTestData(autoTester.getOriginFrame());

    var parabolas = [];
    parabolas.push(Pointers.createPointer(PickType.Parabola, {
        position: Vec3.sum(Vec3.sum(pos, Vec3.multiply(-0.5, Vec3.UP)), Vec3.multiply(-0.5, right)),
        direction: Vec3.normalize({x: 1, y: 1, z: 0}),
        filter: Picks.PICK_ENTITIES,
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        speed: 3.0,
        accelerationAxis: {x: 0, y: -5, z: 0},
        enabled: true,
        lockEnd: true
    }));
    Pointers.setRenderState(parabolas[0], "one");

    var properties = {
        type: "Shape",
        shape: "Cube",
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(0.0, right)),
        dimensions: {x: 0.1, y: 0.5, z: 0.5},
        lifetime: 300,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } }),
        rotation: orientation
    };
    var box = Entities.addEntity(properties);

    autoTester.addStep("Move back to see the objects", function () {
        var offset = { x: 0.0, y: 0.0, z: 1.0 };
        MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
        validationCamera_translate(offset);
    });

    autoTester.addStepSnapshot("1st Position");

    autoTester.addStep("Move to 2nd position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.3, Vec3.UP))
        });
    });
    autoTester.addStepSnapshot("2nd Position");

    autoTester.addStep("Move to 3rd Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.2, Vec3.UP))
        });
    });
    autoTester.addStepSnapshot("3rd Position");

    autoTester.addStep("Move to 4th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.1, Vec3.UP))
        });
    });
    autoTester.addStepSnapshot("4th Position");

    autoTester.addStep("Move to 5th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.0, Vec3.UP))
        });
    });
    autoTester.addStepSnapshot("5th Position");

    autoTester.addStep("Move to 6th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.1, Vec3.UP))
        });
    });
    autoTester.addStepSnapshot("6th Position");

    autoTester.addStep("Move to 7th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.2, Vec3.UP))
        });
    });
    autoTester.addStepSnapshot("7th Position");

    autoTester.addStep("Move to 8th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.3, Vec3.UP))
        });
    });
    autoTester.addStepSnapshot("8th Position");

    autoTester.addStep("Move to 9th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.4, Vec3.UP))
        });
    });
    autoTester.addStepSnapshot("9th Position");

    autoTester.addStep("Move to 10th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.5, Vec3.UP))
        });
    });
    autoTester.addStepSnapshot("10th Position");

    autoTester.addStep("Move t 11th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.6, Vec3.UP))
        });
    });
    autoTester.addStepSnapshot("11th Position");

    autoTester.addStep("Clean up", function () {
        for (i = 0; i < parabolas.length; i++) {
            Pointers.removePointer(parabolas[i]);
        }

        Entities.deleteEntity(box);
        parabolas = [];
    });

    var result = autoTester.runTest(testType);
});
