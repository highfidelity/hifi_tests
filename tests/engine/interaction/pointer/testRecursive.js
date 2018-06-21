// This is an automatically generated file, created by auto-tester on Jun 21 2018, 14:25

Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

var repositoryPath = autoTester.getRepositoryPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(repositoryPath + "engine/interaction/pointer/laser/renderState/test.js");
Script.include(repositoryPath + "engine/interaction/pointer/laser/lockEndUUID/test.js");
Script.include(repositoryPath + "engine/interaction/pointer/laser/lockEnd/test.js");
Script.include(repositoryPath + "engine/interaction/pointer/laser/ignore/test.js");
Script.include(repositoryPath + "engine/interaction/pointer/laser/faceAvatar/test.js");
Script.include(repositoryPath + "engine/interaction/pointer/laser/enable/test.js");
Script.include(repositoryPath + "engine/interaction/pointer/laser/distanceScaleEnd/test.js");
Script.include(repositoryPath + "engine/interaction/pointer/laser/centerEndY/test.js");

autoTester.runRecursive();
