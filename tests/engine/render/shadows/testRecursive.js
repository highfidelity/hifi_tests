// This is an automatically generated file, created by auto-tester on May 25 2018, 12:53

user = "highfidelity/";
repository = "hifi_tests/";
branch = "master/";

var autoTester = Script.require("https://github.com/highfidelity/hifi_tests/blob/master/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/shadows/normal/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/shadows/grazing/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/shadows/front/test.js?raw=true");

autoTester.runRecursive();
