// This is an automatically generated file, created by auto-tester on Jun 15 2018, 14:06

user = "highfidelity/";
repository = "hifi_tests/";
branch = getBranch(Script.resolvePath("."), repository) +" / ";

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

var repositoryPath = "https://github.com/" + user + repository + "blob/" + branch;
var autoTester = Script.require(repositoryPath + "tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();


autoTester.runRecursive();
