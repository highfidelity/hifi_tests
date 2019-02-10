// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);

if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));
if (typeof testsRootPath === 'undefined') testsRootPath = nitpick.getTestsRootPath();

nitpick.enableRecursive();
nitpick.enableAuto();

Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/vertexColor/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/triangle/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/textureSettings/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/sparseAccessor/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/riggedFigure/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/orientation/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/monster/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/metalRoughSpheres/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/engine/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/duck/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/city/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/buggy/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/brainstem/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/boxTexture/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/boxAnimation/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/box/test.js");
Script.include(testsRootPath + "content/entity/model/modelReaders/gltfReader/gltfTestSuite/embedded/animatedTriangle/test.js");

nitpick.runRecursive();
