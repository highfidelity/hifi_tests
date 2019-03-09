if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Material fallthrough", Script.resolvePath("."), "secondary", function(testType) {
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
    var assetsRootPath = nitpick.getAssetsRootPath();

    var LIFETIME = 120;

    function getPos(x, y) {
        var center = posOri.pos;
        return Vec3.sum(Vec3.sum(center, Vec3.multiply(Quat.getRight(MyAvatar.orientation), x)), Vec3.multiply(Quat.getUp(MyAvatar.orientation), y));
    }

    var cube = Entities.addEntity({
        type: "Box",
        position: getPos(0, 1),
        lifetime: LIFETIME,
        dimensions: 1.0,
        orientation: posOri.ori
    });
    createdEntities.push(cube);

    var mat1 = Entities.addEntity({
        type: "Material",
        materialURL: "materialData",
        position: getPos(-1, 0),
        materialData: JSON.stringify({ materials: {
          albedo: [1, 0, 0]
        }}),
        priority: 1,
        lifetime: LIFETIME,
        parentID: cube
    });
    createdEntities.push(mat1);

    var mat2 = Entities.addEntity({
        type: "Material",
        materialURL: "materialData",
        position: getPos(1, 0),
        materialData: JSON.stringify({ materials: {
          albedo: [0, 1, 0]
        }}),
        priority: 2,
        lifetime: LIFETIME,
        parentID: cube
    })
    createdEntities.push(mat2);

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Albedo fallthrough", function () {
        var matData = JSON.parse(Entities.getEntityProperties(mat2).materialData);
        matData.materials.albedo = "fallthrough";
        Entities.editEntity(mat2, { materialData: JSON.stringify(matData) })
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("No albedo", function () {
        var matData = JSON.parse(Entities.getEntityProperties(mat2).materialData);
        matData.materials.albedo = "";
        Entities.editEntity(mat2, { materialData: JSON.stringify(matData) })
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Albedo defaultFallthrough", function () {
        var matData = JSON.parse(Entities.getEntityProperties(mat2).materialData);
        matData.materials = { defaultFallthrough: true };
        Entities.editEntity(mat2, { materialData: JSON.stringify(matData) })
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Material 1 Albedo Map", function () {
        var matData = JSON.parse(Entities.getEntityProperties(mat1).materialData);
        matData.materials.albedoMap = assetsRootPath + "textures/textureCube.png";
        Entities.editEntity(mat1, { materialData: JSON.stringify(matData) })
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Material 2 Normal Map", function () {
        var matData = JSON.parse(Entities.getEntityProperties(mat2).materialData);
        matData.materials.normalMap = assetsRootPath + "textures/normalMap.png";
        Entities.editEntity(mat2, { materialData: JSON.stringify(matData) })
    });

    nitpick.addStepSnapshot("Take snapshot");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});