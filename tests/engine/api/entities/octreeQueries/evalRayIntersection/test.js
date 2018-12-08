if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Entities.evalRayIntersection", Script.resolvePath("."), "secondary", function(testType) {
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
        var CENTER = Vec3.sum(posOri.pos, { x: 0, y: 1, z: 0 });
        return Vec3.sum(Vec3.sum(CENTER, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col * 0.3)),
                                         Vec3.multiply(Quat.getUp(MyAvatar.orientation), row * 0.3));
    }

    var SIDE = 6;
    for (var y = 0; y < SIDE; y++) {
        createdEntities.push(Entities.addEntity({
            type: "Box",
            position: getPos(0, y - (SIDE - 1) / 2),
            dimensions: 0.3,
            color: "red",
            collisionless: y > (SIDE / 2) ? true : false,
            lifetime: LIFETIME
        }, (y % 3 == 0) ? "local" : (y % 3 == 1 ? "avatar" : "domain")));
    }

    nitpick.addStepSnapshot("Take snapshot");

    var pick = {
        origin: Vec3.sum(posOri.pos, { x: 0, y: 5, z: 0 }),
        direction: { x: 0, y: -1, z: 0}
    }
    nitpick.addStep("evalRayIntersection", function () {
        var result = Entities.evalRayIntersection(pick, 0);
        Entities.editEntity(result.entityID, { color: "blue" });
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("evalRayIntersection with avatar filter", function () {
        var result = Entities.evalRayIntersection(pick, Picks.PICK_AVATAR_ENTITIES);
        Entities.editEntity(result.entityID, { color: "green" });
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("evalRayIntersection with collidable filter", function () {
        var result = Entities.evalRayIntersection(pick, Picks.PICK_INCLUDE_COLLIDABLE);
        Entities.editEntity(result.entityID, { color: "cyan" });
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("findRayIntersection", function () {
        var result = Entities.findRayIntersection(pick);
        Entities.editEntity(result.entityID, { color: "black" });
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});