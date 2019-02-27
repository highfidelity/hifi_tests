// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);

if (typeof depth === 'undefined') {
   depth = 0;
   nitpick = createNitpick(Script.resolvePath("."));
   testsRootPath = nitpick.getTestsRootPath();

   nitpick.enableRecursive();
   nitpick.enableAuto();

   if (typeof Test !== 'undefined') {
       Test.wait(10000);
   }
} else {
   depth++
}

Script.include(testsRootPath + "content/entity/material/apply/targeting/test.js");
Script.include(testsRootPath + "content/entity/material/apply/overlays/testRecursive.js");
Script.include(testsRootPath + "content/entity/material/apply/entities/testRecursive.js");
Script.include(testsRootPath + "content/entity/material/apply/avatars/test.js");

if (depth > 0) {
   depth--;
} else {
   nitpick.runRecursive();
}

