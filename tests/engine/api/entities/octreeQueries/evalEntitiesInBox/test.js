if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Entities.evalEntitiesInBox", Script.resolvePath("."), "secondary", function(testType) {
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
    var CENTER = Vec3.sum(posOri.pos, { x: 0, y: 1, z: 0 });

    function getPos(col, row) {
        return Vec3.sum(Vec3.sum(CENTER, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col * 0.2)),
                                         Vec3.multiply(Quat.getUp(MyAvatar.orientation), row * 0.2));
    }

    var SIDE = 9;
    for (var x = 0; x < SIDE; x++) {
        for (var y = 0; y < SIDE; y++) {
            createdEntities.push(Entities.addEntity({
                type: ((x + y) % 2 == 0) ? "Box" : "Sphere",
                name: y < (SIDE / 2) ? "one" : "two",
                position: getPos(x - (SIDE - 1) / 2, y - (SIDE - 1) / 2),
                dimensions: 0.2,
                color: "red",
                collisionless: y < (SIDE / 2) ? true : false,
                lifetime: LIFETIME
            }, (x < SIDE / 3) ? "domain" : (x < 2 * SIDE / 3 ? "avatar" : "local")));
        }
    }

    nitpick.addStepSnapshot("Take snapshot");

    var DIM = 0.5;
    nitpick.addStep("evalEntitiesInBox", function () {
        var entities = Entities.evalEntitiesInBox(CENTER, DIM, 0);
        for (var i = 0; i < entities.length; i++) {
            Entities.editEntity(entities[i], { color: "blue" });
        }
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("findEntitiesInBox", function () {
        var entities = Entities.findEntitiesInBox(CENTER, DIM);
        for (var i = 0; i < entities.length; i++) {
            Entities.editEntity(entities[i], { color: "green" });
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