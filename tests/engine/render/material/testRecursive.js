// This is an automatically generated file, created by auto-tester on Jun 13 2018, 9:33

user = "highfidelity/";
repository = "hifi_tests/";
branch = "RC69/";

Test.wait(10000);

var repositoryPath = "https://github.com/" + user + repository + "blob/" + branch;
var autoTester = Script.require(repositoryPath + "tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(repositoryPath + "/tests/engine/render/material/roughness_map/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/roughness/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/opacity/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/normal_map/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/emissive/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/base/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/albedo/test.js?raw=true");

autoTester.runRecursive();
