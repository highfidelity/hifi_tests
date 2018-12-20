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

Script.include(testsRootPath + "content/entity/image/subImage/test.js");
Script.include(testsRootPath + "content/entity/image/keepAspectRatio/test.js");
Script.include(testsRootPath + "content/entity/image/emissive/test.js");
Script.include(testsRootPath + "content/entity/image/color/test.js");
Script.include(testsRootPath + "content/entity/image/billboardMode/test.js");
Script.include(testsRootPath + "content/entity/image/alpha/test.js");

nitpick.runRecursive();
