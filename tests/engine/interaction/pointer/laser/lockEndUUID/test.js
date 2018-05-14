var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("LaserPointer lockEndUUID test", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest(true);
    
    Script.include("../laserPointerUtils.js?raw=true");

    var lasers = [];
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.0, right)),
        direction: Vec3.normalize({x: 0, y: -1, z: 0}),
        filter: Picks.PICK_ENTITIES,
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        enabled: true
    }));
    Pointers.setRenderState(lasers[0], "one");

    var entities = [];
    var overlays = [];
    var properties = {
        type: "Shape",
        shape: "Cube",
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.25, right)),
        dimensions: {x: 0.1, y: 0.1, z: 0.5},
        lifetime: 300,
        color: {red:255, green:0, blue:0},
        rotation: orientation
    };
    
    entities.push(Entities.addEntity(properties));
    properties.position = Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.25, right));
    properties.color = {red:0, green:255, blue:0};
    properties.solid = true;
    properties.alpha = 1;
    overlays.push(Overlays.addOverlay("cube", properties));

    Pointers.setLockEndUUID(lasers[0], entities[0], false);
    
    autoTester.addStepSnapshot("Attached to left", function() {
        Pointers.setLockEndUUID(lasers[0], overlays[0], true);
    });
    
    autoTester.addStepSnapshot("Attached to right", function() {
        Pointers.setLockEndUUID(lasers[0], null, false);
    });

    autoTester.addStepSnapshot("Not attached");

    autoTester.addStep("Clean up", function () {
        for (i = 0; i < lasers.length; i++) {
            Pointers.removePointer(lasers[i]);
        }
        for (i = 0; i < entities.length; i++) {
            Entities.deleteEntity(entities[i]);
        }
        for (i = 0; i < overlays.length; i++) {
            Overlays.deleteOverlay(overlays[i]);
        }
        lasers = [];
        entities = [];
        overlays = [];
    });
    
    var result = autoTester.runTest(testType);
});
