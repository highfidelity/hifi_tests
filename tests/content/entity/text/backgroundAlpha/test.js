if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Text Entity backgroundAlpha", Script.resolvePath("."), "secondary", [["high.windows.amd", "tier.os.gpu"], ["high.windows.nvidia", "tier.os.gpu"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {
    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");
    var LIFETIME = 200;

    // Add the test Cases
    var initData = {
        flags: {
            hasKeyLight: true,
            hasAmbientLight: true
        },
        lifetime: LIFETIME,
        originFrame: nitpick.getOriginFrame()
    };
    var createdEntities = setupStage(initData);

    var posOri = getStagePosOriAt(0, 0, 0);

    function getPos(col, row) {
        var center = posOri.pos;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col)),
                                         Vec3.multiply(Quat.getUp(MyAvatar.orientation), row));
    }

    createdEntities.push(Entities.addEntity({
        type: "Text",
        position: getPos(-0.5, 1),
        dimensions: 1.0,
        text: "test",
        lineHeight: 0.5,
        backgroundAlpha: 1.0,
        lifetime: LIFETIME
    }));

    createdEntities.push(Entities.addEntity({
        type: "Text",
        position: getPos(0.5, 1),
        dimensions: 1.0,
        text: "test",
        lineHeight: 0.5,
        backgroundAlpha: 0.5,
        lifetime: LIFETIME
    }));

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});