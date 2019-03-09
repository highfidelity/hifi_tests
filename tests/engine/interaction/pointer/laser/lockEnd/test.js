if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("LaserPointer lockEnd test", Script.resolvePath("."), "secondary", function(testType) {
    Script.include("../laserPointerUtils.js?raw=true");

    initializeTestData(nitpick.getOriginFrame());

    var lasers = [];
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.0, right)),
        direction: Vec3.normalize({x: 0, y: -1, z: 0}),
        filter: Picks.PICK_ENTITIES,
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        lockEnd: true,
        enabled: true
    }));
    Pointers.setRenderState(lasers[0], "one");

    var properties = {
        type: "Shape",
        shape: "Cube",
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(0.0, right)),
        dimensions: {x: 0.5, y: 0.1, z: 0.1},
        lifetime: 300,
        rotation: orientation
    };
    var box = Entities.addEntity(properties);

    nitpick.addStep("Move back to see the objects", function () {
        var offset = { x: 0.0, y: 0.0, z: 1.0 };
        MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
        validationCamera_translate(offset);
    });

    nitpick.addStepSnapshot("1st Position");

    nitpick.addStep("Move to 2nd position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.5, right))
        });
    });
    nitpick.addStepSnapshot("2nd Position");

    nitpick.addStep("Move to 3rd Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.4, right))
        });
    });
    nitpick.addStepSnapshot("3rd Position");

    nitpick.addStep("Move to 4th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.3, right))
        });
    });
    nitpick.addStepSnapshot("4th Position");

    nitpick.addStep("Move to 5th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.2, right))
        });
    });
    nitpick.addStepSnapshot("5th Position");

    nitpick.addStep("Move to 6th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.1, right))
        });
    });
    nitpick.addStepSnapshot("6th Position");

    nitpick.addStep("Move to 7th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.0, right))
        });
    });
    nitpick.addStepSnapshot("7th Position");

    nitpick.addStep("Move to 8th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.1, right))
        });
    });
    nitpick.addStepSnapshot("8th Position");

    nitpick.addStep("Move to 9th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.2, right))
        });
    });
    nitpick.addStepSnapshot("9th Position");

    nitpick.addStep("Move to 10th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.3, right))
        });
    });
    nitpick.addStepSnapshot("10th Position");

    nitpick.addStep("Move t 11th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.4, right))
        });
    });
    nitpick.addStepSnapshot("11th Position");

    nitpick.addStep("Clean up", function () {
        for (i = 0; i < lasers.length; i++) {
            Pointers.removePointer(lasers[i]);
        }

        Entities.deleteEntity(box);
        lasers = [];
    });
    
    var result = nitpick.runTest(testType);
});
