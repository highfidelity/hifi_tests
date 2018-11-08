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

Script.include(testsRootPath + "engine/interaction/pick/collision/myavatar/test.js");
Script.include(testsRootPath + "engine/interaction/pick/collision/many/test.js");
Script.include(testsRootPath + "engine/interaction/pick/collision/identical/test.js");
Script.include(testsRootPath + "engine/interaction/pick/collision/filter/test.js");
Script.include(testsRootPath + "engine/interaction/pick/collision/cube/test.js");

nitpick.runRecursive();
