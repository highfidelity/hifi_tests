// This is an automatically generated file, created by auto-tester on Jun 13 2018, 9:29

user = "highfidelity/";
repository = "hifi_tests/";
branch = "master/";

Test.wait(10000);

var repositoryPath = "https://github.com/" + user + repository + "blob/" + branch;
var autoTester = Script.require(repositoryPath + "tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(repositoryPath + "/tests/engine/interaction/pointer/laser/renderState/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/interaction/pointer/laser/lockEndUUID/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/interaction/pointer/laser/lockEnd/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/interaction/pointer/laser/ignore/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/interaction/pointer/laser/faceAvatar/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/interaction/pointer/laser/enable/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/interaction/pointer/laser/distanceScaleEnd/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/interaction/pointer/laser/centerEndY/test.js?raw=true");

autoTester.runRecursive();
