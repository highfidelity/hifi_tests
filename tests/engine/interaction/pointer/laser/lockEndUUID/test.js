if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("LaserPointer lockEndUUID test", Script.resolvePath("."), "secondary", [["high.windows.amd", "tier.os.gpu"], ["high.windows.nvidia", "tier.os.gpu"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {
    Script.include("../laserPointerUtils.js?raw=true");

    initializeTestData(nitpick.getOriginFrame());

    var lasers = [];
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, { x: 0.0, y: 0.5, z: 0.0 }), Vec3.multiply(0.0, right)),
        direction: Vec3.normalize({ x: 0.0, y: -1, z: 0.0 }),
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
        position: Vec3.sum(Vec3.sum(pos, { x: 0.0, y: -0.25, z: 0.0 }), Vec3.multiply(-0.25, right)),
        dimensions: {x: 0.1, y: 0.1, z: 0.5},
        lifetime: 300,
        color: {red:255, green:0, blue:0},
        rotation: orientation,
        isVisibleInSecondaryCamera: true
    };
    
    entities.push(Entities.addEntity(properties));
    properties.position = Vec3.sum(Vec3.sum(pos, { x:0.0, y: -0.25, z:0 }), Vec3.multiply(0.25, right));
    properties.color = { red: 0, green: 255, blue: 0 };
    properties.solid = true;
    properties.alpha = 1;
    overlays.push(Overlays.addOverlay("cube", properties));

    Pointers.setLockEndUUID(lasers[0], entities[0], false);

    nitpick.addStep("Move back to see the objects", function () {
        var offset = { x: 0.0, y: 0.0, z: 1.0 };
        MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
        validationCamera_translate(offset);
    });
    nitpick.addStepSnapshot("Attached to left:");
    
    nitpick.addStep("Attach to right", function() {
        Pointers.setLockEndUUID(lasers[0], overlays[0], true);
    });
    nitpick.addStepSnapshot("Attached to right:");
    
    nitpick.addStep("Disconnect", function() {
        Pointers.setLockEndUUID(lasers[0], null, false);
    });
    nitpick.addStepSnapshot("Not attached:");

    nitpick.addStep("Clean up", function () {
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
    
    var result = nitpick.runTest(testType);
});
