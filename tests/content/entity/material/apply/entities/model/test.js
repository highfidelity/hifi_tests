if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Apply Material Entities to Model Entities", Script.resolvePath("."), "secondary", [["high", "tier"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {
    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");

    // Add the test Cases
    var initData = {
        flags : { 
            hasAmbientLight: false
        },
        originFrame: nitpick.getOriginFrame()
    };
    var createdEntities = setupStage(initData);

    var posOri = getStagePosOriAt(1, 0, 0);

    var NUM_ROWS = 2;
    var LIFETIME = 200;

    var DIM = {x: 0.7, y: 0.8, z: 0.14};

    function getPos(col, row) {
        var center = posOri.pos;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), col * DIM.x)), Vec3.multiply(Quat.getUp(MyAvatar.orientation), -(row - NUM_ROWS) * DIM.y));
    }

    for (var i = 0; i <= NUM_ROWS; i++) {
        for (var j = 0; j <= NUM_ROWS; j++) {
            var pos = getPos(j - NUM_ROWS/2, i + 0.5);
            var model = Entities.addEntity({
                          type: "Model",
                          position: pos,
                          lifetime: LIFETIME,
                          modelURL: "http://mpassets.highfidelity.com/0dce3426-55c8-4641-8dd5-d76eb575b64a-v1/Anime_F_Outfit.fst",
                          dimensions: DIM,
                          orientation: posOri.ori
            });
            createdEntities.push(model);
            if (i != 0 || j != 0) {
                var props = {
                              type: "Material",
                              materialURL: "materialData",
                              position: pos,
                              materialData: JSON.stringify({ "materials": {
                                "albedo": [i / NUM_ROWS, 0, j / NUM_ROWS ]
                              }}),
                              lifetime: LIFETIME,
                              priority: 1,
                              parentID: model
                }
                if (i == 1) {
                    props.parentMaterialName = j;
                } else if (i == 2) {
                    props.parentMaterialName = "mat::" + "StingrayPBS" + (j + 1);
                }
                createdEntities.push(Entities.addEntity(props));
            }
        }
    }

    nitpick.addDelay(6);

    nitpick.addStepSnapshot("Display materials on multiple models");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});