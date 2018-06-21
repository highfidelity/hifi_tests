// This is an automatically generated file, created by auto-tester on Jun 21 2018, 14:15

Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/RC69/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

var repositoryPath = autoTester.getRepositoryPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(repositoryPath + "content/entity/zone/zoneOrientation/test.js");
Script.include(repositoryPath + "content/entity/zone/create/test.js");
Script.include(repositoryPath + "content/entity/zone/ambientLightZoneEffects/test.js");
Script.include(repositoryPath + "content/entity/zone/ambientLightInheritance/test.js");

autoTester.runRecursive();
