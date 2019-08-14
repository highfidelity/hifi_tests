if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Image Entity alpha", Script.resolvePath("."), "secondary", undefined, undefined, function(testType) {
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
    var assetsRootPath = nitpick.getAssetsRootPath();

    function getPos(col, row) {
        var center = posOri.pos;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col)),
                                         Vec3.multiply(Quat.getUp(MyAvatar.orientation), row));
    }

    var IMAGES_START_INDEX = createdEntities.length;

    createdEntities.push(Entities.addEntity({
        type: "Image",
        imageURL: assetsRootPath + "textures/redArrow.jpg",
        position: getPos(-0.5, 1),
        dimensions: 1.0,
        keepAspectRatio: false,
        alpha: 1.0,
        lifetime: LIFETIME
    }));

    createdEntities.push(Entities.addEntity({
        type: "Image",
        imageURL: assetsRootPath + "textures/redArrow.jpg",
        position: getPos(0.5, 1),
        dimensions: 1.0,
        keepAspectRatio: false,
        alpha: 0.5,
        lifetime: LIFETIME
    }));

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Switch alphas of images", function () {
        for (var i = IMAGES_START_INDEX; i < createdEntities.length; i++) {
            var alpha = Entities.getEntityProperties(createdEntities[i]).alpha;
            Entities.editEntity(createdEntities[i], { alpha: -(alpha - 1.5)});
        }
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});