// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);

if (typeof depth === 'undefined') {
   depth = 0;
   nitpick = createNitpick(Script.resolvePath("."));
   testsRootPath = nitpick.getTestsRootPath();

   nitpick.enableRecursive();
   nitpick.enableAuto();
} else {
   depth++
}

Script.include(testsRootPath + "engine/render/effect/ambientocclusion/ssao/testRecursive.js");
Script.include(testsRootPath + "engine/render/effect/ambientocclusion/hbao/testRecursive.js");

if (depth > 0) {
   depth--;
} else {
   nitpick.runRecursive();
}

