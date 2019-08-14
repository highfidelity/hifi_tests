if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Parabola - enabling and disabling", Script.resolvePath("."), "secondary", undefined, undefined, function(testType) {
    Script.include("../parabolaPointerUtils.js?raw=true");

    initializeTestData(nitpick.getOriginFrame());

    var pointers = [];
    pointers.push(Pointers.createPointer(PickType.Parabola, {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(-0.25, right)),
        direction: Vec3.normalize({x: 1, y: 1, z: 1}),
        filter: Picks.PICK_ENTITIES,
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        speed: 5.0,
        accelerationAxis: {x: 0, y: -5, z: 0},
        enabled: true
    }));
    pointers.push(Pointers.createPointer(PickType.Parabola, {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.25, right)),
        direction: Vec3.normalize({x: 1, y: 1, z: 1}),
        filter: Picks.PICK_ENTITIES,
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        speed: 5.0,
        accelerationAxis: {x: 0, y: -5, z: 0},
        enabled: false
    }));

    for (i = 0; i < pointers.length; i++) {
        Pointers.setRenderState(pointers[i], "one");
    }

    Pointers.disablePointer(pointers[0]);
    Pointers.enablePointer(pointers[1]);

    nitpick.addStep("Move back to see the objects", function () {
        var offset = { x: 0.0, y: 0.0, z: 2.0 };
        MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
        validationCamera_translate(offset);
    });
    nitpick.addStepSnapshot("Right pick enabled", function () {

    nitpick.addStep("Enable left pick", function () {
        Pointers.disablePointer(pointers[1]);
        Pointers.enablePointer(pointers[0]);
    });
    nitpick.addStepSnapshot("Left pick enabled");

    nitpick.addStep("Clean up", function () {
        for (i = 0; i < pointers.length; i++) {
            Pointers.removePointer(pointers[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
