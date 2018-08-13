// This is an automatically generated file, created by auto-tester
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

var testsRootPath = autoTester.getTestsRootPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(testsRootPath + "content/entity/zone/zoneOrientation/test.js");
Script.include(testsRootPath + "content/entity/zone/zoneEffects/test.js");
Script.include(testsRootPath + "content/entity/zone/create/test.js");
Script.include(testsRootPath + "content/entity/zone/ambientLightInheritance/test.js");
Script.include(testsRootPath + "content/entity/shape/create/test.js");
Script.include(testsRootPath + "content/entity/procedural/test.js");
Script.include(testsRootPath + "content/entity/material/create/test.js");
Script.include(testsRootPath + "content/entity/material/apply/overlays/model/test.js");
Script.include(testsRootPath + "content/entity/material/apply/entities/shape/test.js");
Script.include(testsRootPath + "content/entity/material/apply/entities/model/test.js");
Script.include(testsRootPath + "content/entity/material/apply/avatars/test.js");
Script.include(testsRootPath + "content/entity/light/spot/create/test.js");
Script.include(testsRootPath + "content/entity/light/point/create/test.js");

autoTester.runRecursive();
