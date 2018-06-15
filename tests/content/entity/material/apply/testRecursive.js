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

Script.include(repositoryPath + "/tests/content/entity/material/apply/overlays/model/test.js?raw=true");
Script.include(repositoryPath + "/tests/content/entity/material/apply/entities/shape/test.js?raw=true");
Script.include(repositoryPath + "/tests/content/entity/material/apply/entities/model/test.js?raw=true");
Script.include(repositoryPath + "/tests/content/entity/material/apply/avatars/test.js?raw=true");

autoTester.runRecursive();
