if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Parabola renderState test", Script.resolvePath("."), "secondary", function(testType) {
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

    var entities = [];
    var properties = {
        type: "Shape",
        shape: "Cube",
        position: Vec3.sum(Vec3.sum(pos, { x:0.0, y: 0.0, z: 0.0}), Vec3.multiply(0.5, right)),
        dimensions: { x: 0.1, y: 1.0, z: 0.1 },
        lifetime: 300,
        rotation: orientation
    };
    entities.push(Entities.addEntity(properties));

    var states = ["", "one", "two", "three", "four", "five"];

    Pointers.setRenderState(parabolas[0], states[0]);

    autoTester.addStepSnapshot("Not attached");

    autoTester.addStep("Set to state 1 (red)", function() {
        Pointers.setRenderState(parabolas[0], states[1]);
    });
    autoTester.addStepSnapshot("Attached red:");

    autoTester.addStep("Set to state 2 (green)", function() {
        Pointers.setRenderState(parabolas[0], states[2]);
    });
    autoTester.addStepSnapshot("Attached green:");

    autoTester.addStep("Set to state 3 (blue)", function() {
        Pointers.setRenderState(parabolas[0], states[3]);
    });
    autoTester.addStepSnapshot("Attached blue:");

    autoTester.addStep("Set to state 4 (cyan)", function() {
        Pointers.setRenderState(parabolas[0], states[4]);
    });
    autoTester.addStepSnapshot("Attached cyan:");

    autoTester.addStep("Set to state 5 (red)", function() {
        Pointers.setRenderState(parabolas[0], states[5]);
    });
    autoTester.addStepSnapshot("Attached red:");

    autoTester.addStep("Clean up", function () {
        for (i = 0; i < parabolas.length; i++) {
            Pointers.removePointer(parabolas[i]);
        }
        for (i = 0; i < entities.length; i++) {
            Entities.deleteEntity(entities[i]);
        }
        parabolas = [];
        entities = [];
    });

    var result = autoTester.runTest(testType);
});
