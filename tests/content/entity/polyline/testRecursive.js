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

Script.include(testsRootPath + "content/entity/polyline/textures/test.js");
Script.include(testsRootPath + "content/entity/polyline/strokeColors/test.js");
Script.include(testsRootPath + "content/entity/polyline/normals/test.js");
Script.include(testsRootPath + "content/entity/polyline/linePoints/test.js");
Script.include(testsRootPath + "content/entity/polyline/isUVModeStretch/test.js");
Script.include(testsRootPath + "content/entity/polyline/glow/test.js");
Script.include(testsRootPath + "content/entity/polyline/faceCamera/test.js");
Script.include(testsRootPath + "content/entity/polyline/color/test.js");

if (depth > 0) {
   depth--;
} else {
   nitpick.runRecursive();
}

