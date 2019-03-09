if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Polyline Entity textures", Script.resolvePath("."), "secondary", function(testType) {
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
    var assetsRootPath = nitpick.getAssetsRootPath();

    var posOri = getStagePosOriAt(0, 0, 0);

    function getPos(col, row) {
        var center = posOri.pos;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col)),
                                         Vec3.multiply(Quat.getUp(MyAvatar.orientation), row));
    }

    createdEntities.push(Entities.addEntity({
        type: "PolyLine",
        position: getPos(-0.75, 1),
        dimensions: 1.0,
        linePoints: [
            {x: -0.5, y: 0.5, z: 0.0},
            {x: 0.0, y: -0.5, z: 0.0},
            {x: 0.5, y: 0.5, z: 0.0}
        ],
        normals: [
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 }
        ],
        strokeWidths: [ 0.25, 0.25, 0.25 ],
        color: "red",
        lifetime: LIFETIME
    }));

    createdEntities.push(Entities.addEntity({
        type: "PolyLine",
        position: getPos(0.75, 1),
        dimensions: 1.0,
        linePoints: [
            {x: -0.5, y: 0.5, z: 0.0},
            {x: 0.0, y: -0.5, z: 0.0},
            {x: 0.5, y: 0.5, z: 0.0}
        ],
        normals: [
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 }
        ],
        strokeWidths: [ 0.25, 0.25, 0.25 ],
        color: "red",
        textures: assetsRootPath + "textures/paintStroke.png",
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