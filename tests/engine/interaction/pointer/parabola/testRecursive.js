// This is an automatically generated file, created by auto-tester on Jul 30 2018, 12:19

PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

var testsRootPath = autoTester.getTestsRootPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(testsRootPath + "engine/interaction/pointer/parabola/renderState/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/parabola/lockEnd/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/parabola/ignore/test.js");
Script.include(testsRootPath + "engine/interaction/pointer/parabola/enable/test.js");

autoTester.runRecursive();
