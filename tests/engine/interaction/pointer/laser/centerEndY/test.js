if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Laser Pointer - from centre down Y axis", Script.resolvePath("."), "secondary", [["high", "tier"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {
    Script.include("../laserPointerUtils.js?raw=true");

    initializeTestData(nitpick.getOriginFrame());

    var lasers = [];
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, { x: 0.0, y: 0.3, z: 0.0 }), Vec3.multiply(0.0, right)),
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
        position: Vec3.sum(Vec3.sum(pos, { x: 0.0, y: -0.2, z:0 }), Vec3.multiply(0.0, right)),
        dimensions: { x: 0.1, y: 0.1, z: 0.1 },
        lifetime: 300,
        rotation: orientation
    };
    entities.push(Entities.addEntity(properties));

    nitpick.addStepSnapshot("Running LaserPointer centerEndY test");

    nitpick.addStep("Clean up after test", function () {
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
