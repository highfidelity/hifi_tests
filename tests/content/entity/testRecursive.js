// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);

if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));
if (typeof testsRootPath === 'undefined') testsRootPath = nitpick.getTestsRootPath();

nitpick.enableRecursive();
nitpick.enableAuto();

Script.include(testsRootPath + "content/entity/zone/testRecursive.js");
Script.include(testsRootPath + "content/entity/text/testRecursive.js");
Script.include(testsRootPath + "content/entity/shape/testRecursive.js");
Script.include(testsRootPath + "content/entity/procedural/testRecursive.js");
Script.include(testsRootPath + "content/entity/polyline/testRecursive.js");
Script.include(testsRootPath + "content/entity/parenting/test.js");
Script.include(testsRootPath + "content/entity/model/testRecursive.js");
Script.include(testsRootPath + "content/entity/material/testRecursive.js");
Script.include(testsRootPath + "content/entity/light/testRecursive.js");
Script.include(testsRootPath + "content/entity/image/testRecursive.js");
Script.include(testsRootPath + "content/entity/grid/testRecursive.js");

if (typeof runningRecursive === 'undefined') {
   runningRecursive = true;
   nitpick.runRecursive();
}

