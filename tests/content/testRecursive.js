// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

var testsRootPath = nitpick.getTestsRootPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

nitpick.enableRecursive();
nitpick.enableAuto();

Script.include(testsRootPath + "content/overlay/material/test.js");
Script.include(testsRootPath + "content/overlay/layer/drawInFront/shape/test.js");
Script.include(testsRootPath + "content/overlay/layer/drawInFront/model/test.js");
Script.include(testsRootPath + "content/overlay/layer/drawInFront/alpha/test.js");
Script.include(testsRootPath + "content/overlay/layer/drawHUDLayer/test.js");
Script.include(testsRootPath + "content/entity/zone/zoneOrientation/test.js");
Script.include(testsRootPath + "content/entity/zone/zoneEffects/test.js");
Script.include(testsRootPath + "content/entity/zone/shadowControl/test.js");
Script.include(testsRootPath + "content/entity/zone/create/test.js");
Script.include(testsRootPath + "content/entity/zone/ambientLightInheritance/test.js");
Script.include(testsRootPath + "content/entity/text/topMargin/test.js");
Script.include(testsRootPath + "content/entity/text/textColor/test.js");
Script.include(testsRootPath + "content/entity/text/textAlpha/test.js");
Script.include(testsRootPath + "content/entity/text/rightMargin/test.js");
Script.include(testsRootPath + "content/entity/text/lineHeight/test.js");
Script.include(testsRootPath + "content/entity/text/leftMargin/test.js");
Script.include(testsRootPath + "content/entity/text/bottomMargin/test.js");
Script.include(testsRootPath + "content/entity/text/billboardMode/test.js");
Script.include(testsRootPath + "content/entity/text/backgroundColor/test.js");
Script.include(testsRootPath + "content/entity/text/backgroundAlpha/test.js");
Script.include(testsRootPath + "content/entity/shape/create/test.js");
Script.include(testsRootPath + "content/entity/procedural/shapeUniforms/test.js");
Script.include(testsRootPath + "content/entity/polyline/textures/test.js");
Script.include(testsRootPath + "content/entity/polyline/strokeColors/test.js");
Script.include(testsRootPath + "content/entity/polyline/normals/test.js");
Script.include(testsRootPath + "content/entity/polyline/linePoints/test.js");
Script.include(testsRootPath + "content/entity/polyline/isUVModeStretch/test.js");
Script.include(testsRootPath + "content/entity/polyline/glow/test.js");
Script.include(testsRootPath + "content/entity/polyline/faceCamera/test.js");
Script.include(testsRootPath + "content/entity/polyline/color/test.js");
Script.include(testsRootPath + "content/entity/parenting/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/objReader/transparent/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/objReader/still_life/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/fbxReader/still_life/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/fbxReader/simple/test.js");
Script.include(testsRootPath + "content/entity/material/fallthrough/test.js");
Script.include(testsRootPath + "content/entity/material/create/test.js");
Script.include(testsRootPath + "content/entity/material/apply/overlays/model/test.js");
Script.include(testsRootPath + "content/entity/material/apply/entities/shape/test.js");
Script.include(testsRootPath + "content/entity/material/apply/entities/model/test.js");
Script.include(testsRootPath + "content/entity/material/apply/avatars/test.js");
Script.include(testsRootPath + "content/entity/light/spot/create/test.js");
Script.include(testsRootPath + "content/entity/light/point/create/test.js");
Script.include(testsRootPath + "content/entity/image/subImage/test.js");
Script.include(testsRootPath + "content/entity/image/keepAspectRatio/test.js");
Script.include(testsRootPath + "content/entity/image/emissive/test.js");
Script.include(testsRootPath + "content/entity/image/color/test.js");
Script.include(testsRootPath + "content/entity/image/billboardMode/test.js");
Script.include(testsRootPath + "content/entity/image/alpha/test.js");
Script.include(testsRootPath + "content/entity/grid/gridEvery/test.js");
Script.include(testsRootPath + "content/entity/grid/followCamera/test.js");
Script.include(testsRootPath + "content/entity/grid/color/test.js");
Script.include(testsRootPath + "content/entity/grid/alpha/test.js");

nitpick.runRecursive();
