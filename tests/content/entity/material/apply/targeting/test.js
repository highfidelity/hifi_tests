if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Material targeting", Script.resolvePath("."), "secondary", function(testType) {
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
    var assetsRootPath = nitpick.getAssetsRootPath();

    var LIFETIME = 200;

    var DIM = {x: 1.4, y: 1.6, z: 0.28};

    function getPos(x, y) {
        var center = posOri.pos;
        return Vec3.sum(center,
                        Vec3.sum(Vec3.multiply(Quat.getRight(MyAvatar.orientation), x * DIM.x),
                                 Vec3.multiply(Quat.getUp(MyAvatar.orientation), y * DIM.y)));
    }

    const NUM = 4;
    for (var i = 0; i < NUM; i++) {
          var pos = getPos(i - (NUM - 1) / 2, 0.5);
          var model = Entities.addEntity({
                        type: "Model",
                        position: pos,
                        dimensions: DIM,
                        orientation: posOri.ori,
                        modelURL: assetsRootPath + "models/geometry/avatars/art3mis/DefaultStylizedFemale.fbx",
                        lifetime: LIFETIME
          });
          createdEntities.push(model);
          if (i != 0 || j != 0) {
              var props = {
                  type: "Material",
                  position: pos,
                  parentID: model,
                  materialURL: "materialData",
                  materialData: JSON.stringify({ "materials": {
                    "albedo": [i / (NUM - 1), 0, 1 - i / (NUM - 1)]
                  }}),
                  priority: 1,
                  lifetime: LIFETIME
              }
              var parentMaterialNames = [
                  "4",
                  "mat::StingrayPBS2",
                  "[4,mat::StingrayPBS2]",
                  "all"
              ];
              props.parentMaterialName = parentMaterialNames[i];
              createdEntities.push(Entities.addEntity(props));
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