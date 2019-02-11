// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);

if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));
if (typeof testsRootPath === 'undefined') testsRootPath = nitpick.getTestsRootPath();

nitpick.enableRecursive();
nitpick.enableAuto();

Script.include(testsRootPath + "engine/interaction/pointer/parabola/renderState/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/parabola/lockEnd/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/parabola/ignore/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/parabola/enable/test.js");

if (typeof runningRecursive === 'undefined') {
   runningRecursive = true;
   nitpick.runRecursive();
}

