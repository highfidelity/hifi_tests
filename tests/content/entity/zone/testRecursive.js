// This is an automatically generated file, created by auto-tester on May 24 2018, 17:56

user = "highfidelity/;"
repository = "hifi_tests/;"
branch = "master/;"

var autoTester = Script.require("https://github.com/highfidelity/hifi_tests/blob/master/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/zone/zoneOrientation/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/zone/create/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/zone/ambientLightZoneEffects/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/zone/ambientLightInheritance/test.js?raw=true");

autoTester.runRecursive();
