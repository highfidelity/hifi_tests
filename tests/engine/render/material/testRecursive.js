// This is an automatically generated file, created by auto-tester on Jun 21 2018, 14:15

Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/RC69/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

var repositoryPath = autoTester.getRepositoryPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(repositoryPath + "engine/render/material/roughness_map/test.js");
Script.include(repositoryPath + "engine/render/material/roughness/test.js");
Script.include(repositoryPath + "engine/render/material/opacity/test.js");
Script.include(repositoryPath + "engine/render/material/normal_map/test.js");
Script.include(repositoryPath + "engine/render/material/emissive/test.js");
Script.include(repositoryPath + "engine/render/material/base/test.js");
Script.include(repositoryPath + "engine/render/material/albedo/test.js");

autoTester.runRecursive();
