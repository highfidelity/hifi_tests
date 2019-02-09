// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);

if (typeof nitpick === 'undefined') var nitpick = createNitpick(Script.resolvePath("."));
if (typeof testsRootPath === 'undefined') var testsRootPath = nitpick.getTestsRootPath();

nitpick.enableRecursive();
nitpick.enableAuto();

Script.include(testsRootPath + "engine/interaction/pointer/laser/renderState/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/laser/lockEndUUID/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/laser/lockEnd/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/laser/ignore/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/laser/faceAvatar/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/laser/enable/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/laser/distanceScaleEnd/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/laser/centerEndY/test.js");

nitpick.runRecursive();
