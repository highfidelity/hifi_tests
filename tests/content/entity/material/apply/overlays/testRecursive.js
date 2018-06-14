// This is an automatically generated file, created by auto-tester on Jun 14 2018, 8:02

user = "highfidelity/";
repository = "hifi_tests/";
branch = "RC69/";

Test.wait(10000);

var repositoryPath = "https://github.com/" + user + repository + "blob/" + branch;
var autoTester = Script.require(repositoryPath + "tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(repositoryPath + "/tests/content/entity/material/apply/overlays/model/test.js?raw=true");

autoTester.runRecursive();
