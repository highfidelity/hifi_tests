// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);

if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));
if (typeof testsRootPath === 'undefined') testsRootPath = nitpick.getTestsRootPath();

nitpick.enableRecursive();
nitpick.enableAuto();

Script.include(testsRootPath + "protocol/zone/test.js");
Script.include(testsRootPath + "protocol/text/test.js");
Script.include(testsRootPath + "protocol/sphere/test.js");
Script.include(testsRootPath + "protocol/polyvox/test.js");
Script.include(testsRootPath + "protocol/polyline/test.js");
Script.include(testsRootPath + "protocol/particleEffect/test.js");
Script.include(testsRootPath + "protocol/model/test.js");
Script.include(testsRootPath + "protocol/material/test.js");
Script.include(testsRootPath + "protocol/line/test.js");
Script.include(testsRootPath + "protocol/light/test.js");
Script.include(testsRootPath + "protocol/box/test.js");

if (typeof runningRecursive === 'undefined') {
   runningRecursive = true;
   nitpick.runRecursive();
}

