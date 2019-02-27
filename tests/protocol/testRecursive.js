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

if (depth > 0) {
   depth--;
} else {
   nitpick.runRecursive();
}

