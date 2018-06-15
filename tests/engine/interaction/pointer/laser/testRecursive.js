// This is an automatically generated file, created by auto-tester on Jun 15 2018, 14:25

user = "highfidelity/";
repository = "hifi_tests/";

Script.include("https://github.com/highfidelity/hifi_tests/blob/RC69/tests/utils/branchUtils.js?raw=true");
branch = getBranch(Script.resolvePath("."), repository) +" / ";

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

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
