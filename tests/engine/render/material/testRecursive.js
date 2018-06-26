// This is an automatically generated file, created by auto-tester on Jun 24 2018, 12:31

PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

var testsRootPath = autoTester.getTestsRootPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(testsRootPath + "engine/render/material/roughness_map/test.js");
Script.include(testsRootPath + "engine/render/material/roughness/test.js");
Script.include(testsRootPath + "engine/render/material/opacity/test.js");
Script.include(testsRootPath + "engine/render/material/normal_map/test.js");
Script.include(testsRootPath + "engine/render/material/emissive/test.js");
Script.include(testsRootPath + "engine/render/material/base/test.js");
Script.include(testsRootPath + "engine/render/material/albedo/test.js");

autoTester.runRecursive();
