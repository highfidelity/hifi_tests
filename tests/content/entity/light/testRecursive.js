// This is an automatically generated file, created by auto-tester on May 24 2018, 13:34

user = "highfidelity/"
repository = "hifi_tests/"
branch = "master/"

var autoTester = Script.require("https://github.com/highfidelity/hifi_tests/blob/master/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/light/spot/create/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/light/point/create/test.js?raw=true");

autoTester.runRecursive();
