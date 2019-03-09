if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Size of laser end increases with distance", Script.resolvePath("."), "secondary", function(testType) {
    Script.include("../laserPointerUtils.js?raw=true");

    initializeTestData(nitpick.getOriginFrame());

    var lasers = [];
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.75, z:0}), Vec3.multiply(0.0, right)),
        direction: Vec3.normalize({x: 0, y: -1, z: 0}),
        filter: Picks.PICK_ENTITIES,
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        distanceScaleEnd: true,
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

    Entities.editEntity(entities[0], { 
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(0.5, Vec3.UP))
    });

    nitpick.addStep("Move back to see the objects", function () {
        var offset = { x: 0.0, y: 0.0, z: 1.0 };
        MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
        validationCamera_translate(offset);
    });
    nitpick.addStepSnapshot("Minimum distance");

    nitpick.addStep("Move to distance", function () {
        Entities.editEntity(entities[0], { 
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(0.0, Vec3.UP))
        });
    });
    nitpick.addStepSnapshot("Mid distance");

    nitpick.addStep("Move to maximum distance", function () {
        Entities.editEntity(entities[0], { 
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(-0.5, Vec3.UP))
        });
    });
    nitpick.addStepSnapshot("Maximum distance");

    nitpick.addStep("Clean up", function () {
        for (i = 0; i < lasers.length; i++) {
            Pointers.removePointer(lasers[i]);
        }
        for (i = 0; i < entities.length; i++) {
            Entities.deleteEntity(entities[i]);
        }
        lasers = [];
        entities = [];
    });
    
    var result = nitpick.runTest(testType);
});
