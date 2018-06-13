if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("LaserPointer renderState test", Script.resolvePath("."), "primary", function(testType) {
    Script.include("../laserPointerUtils.js?raw=true");

    initializeTestData();

    var lasers = [];
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.0, right)),
        direction: Vec3.normalize({x: 0, y: -1, z: 0}),
        filter: Picks.PICK_ENTITIES,
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        enabled: true
    }));

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

    var states = ["", "one", "two", "three", "four", "five"];

    Pointers.setRenderState(lasers[0], states[0]);
    
    autoTester.addStepSnapshot("Not attached", function() {
        Pointers.setRenderState(lasers[0], states[1]);
    });

    autoTester.addStepSnapshot("Attached red - state 1", function() {
        Pointers.setRenderState(lasers[0], states[2]);
    });

    autoTester.addStepSnapshot("Attached green - state 2", function() {
        Pointers.setRenderState(lasers[0], states[3]);
    });

    autoTester.addStepSnapshot("Attached blue - state 3", function() {
        Pointers.setRenderState(lasers[0], states[4]);
    });

    autoTester.addStepSnapshot("Attached cyan - state 4", function() {
        Pointers.setRenderState(lasers[0], states[5]);
    });

    autoTester.addStepSnapshot("Attached red - state 5");
    
    autoTester.addStep("Clean up", function () {
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
