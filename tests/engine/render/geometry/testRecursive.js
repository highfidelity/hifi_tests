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

Script.include(testsRootPath + "engine/render/geometry/invalidURL/test.js");

if (depth > 0) {
   depth--;
} else {
   nitpick.runRecursive();
}

