// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);

if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));
if (typeof testsRootPath === 'undefined') testsRootPath = nitpick.getTestsRootPath();

nitpick.enableRecursive();
nitpick.enableAuto();

if (typeof depth === 'undefined') {
   depth = 0;
} else {
   depth++
}

Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/waterBottle/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/vertexColor/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/unlit/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/textureCoordinate/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/specVsMetal/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/riggedSimple/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/riggedFigure/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/orientation/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/oldCamera/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/normalTangentMirror/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/normalTangent/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/monster/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/milkTruck/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/lantern/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/fish/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/engine/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/duck/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/damagedHelmet/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/city/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/buggy/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/brainstem/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/boxTexture/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/boxNPOT/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/boxInterleaved/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/boxColor/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/box/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/boomBox/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/avocado/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/glbTestSuite/alphaBlend/test.js");

if (depth > 0) {
   depth--;
} else {
   nitpick.runRecursive();
}

