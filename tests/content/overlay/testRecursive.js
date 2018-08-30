// This is an automatically generated file, created by auto-tester
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

var testsRootPath = autoTester.getTestsRootPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(testsRootPath + "content/overlay/material/test.js");
Script.include(testsRootPath + "content/overlay/layer/drawInFront/shape/test.js");
Script.include(testsRootPath + "content/overlay/layer/drawInFront/model/test.js");
Script.include(testsRootPath + "content/overlay/layer/drawInFront/alpha/test.js");
Script.include(testsRootPath + "content/overlay/layer/drawHUDLayer/test.js");

autoTester.runRecursive();
