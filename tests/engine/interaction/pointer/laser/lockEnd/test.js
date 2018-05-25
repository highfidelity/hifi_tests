if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("LaserPointer lockEnd test", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest(true);
    
    Script.include("../laserPointerUtils.js?raw=true");

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

    autoTester.addStepSnapshot("1st Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.5, right))
        });
    });

    autoTester.addStepSnapshot("2nd Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.4, right))
        });
    });

    autoTester.addStepSnapshot("3rd Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.3, right))
        });
    });

    autoTester.addStepSnapshot("4th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.2, right))
        });
    });

    autoTester.addStepSnapshot("5th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.1, right))
        });
    });

    autoTester.addStepSnapshot("6th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.0, right))
        });
    });

    autoTester.addStepSnapshot("7th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.1, right))
        });
    });

    autoTester.addStepSnapshot("8th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.2, right))
        });
    });

    autoTester.addStepSnapshot("9th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.3, right))
        });
    });

    autoTester.addStepSnapshot("10th Position", function () {
        Entities.editEntity(box, {
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.4, right))
        });
    });

    autoTester.addStepSnapshot("Clean up", function () {
        for (i = 0; i < lasers.length; i++) {
            Pointers.removePointer(lasers[i]);
        }

        Entities.deleteEntity(box);
        lasers = [];
    });
    
    var result = autoTester.runTest(testType);
});
