if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Apply Material Entities to Shape Entities", Script.resolvePath("."), "secondary", undefined, undefined, function(testType) {
    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");

    // Add the test Cases
    var initData = {
        flags : { 
            hasAmbientLight: false
        },
        originFrame: nitpick.getOriginFrame()
    };
    var createdEntities = setupStage(initData);

    var posOri = getStagePosOriAt(0, 0, 0);

    var NUM_ROWS = 4;
    var LIFETIME = 120;

    function getPos(col, row) {
        var center = posOri.pos;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col * 0.2)), Vec3.multiply(Quat.getUp(MyAvatar.orientation), -(row - NUM_ROWS) * 0.2));
    }

    for (var i = 0; i <= NUM_ROWS; i++) {
        for (var j = 0; j <= NUM_ROWS; j++) {
            var pos = getPos(j - NUM_ROWS/2, i);
            var cube = Entities.addEntity({
                          type: "Box",
                          position: pos,
                          lifetime: LIFETIME,
                          dimensions: {x:0.2, y:0.2, z:0.2},
                          orientation: posOri.ori
            });
            createdEntities.push(cube);
            if (i != 0 || j != 0) {
                createdEntities.push(Entities.addEntity({
                              type: "Material",
                              materialURL: "materialData",
                              position: pos,
                              materialData: JSON.stringify({ "materials": {
                                "albedo": [i / NUM_ROWS, 0, j / NUM_ROWS]
                              }}),
                              priority: 1,
                              lifetime: LIFETIME,
                              parentID: cube
                }));
            }
        }
    }

    nitpick.addStepSnapshot("Display materials on multiple shapes");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});