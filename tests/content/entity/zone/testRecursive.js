// This is an automatically generated file, created by auto-tester on Jun 10 2018, 13:53

user = "highfidelity/";
repository = "hifi_tests/";
branch = "master/";

Test.wait(10000);

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/content/entity/zone/zoneOrientation/test.js?raw=true");
Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/content/entity/zone/create/test.js?raw=true");
Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/content/entity/zone/ambientLightZoneEffects/test.js?raw=true");
Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/content/entity/zone/ambientLightInheritance/test.js?raw=true");

autoTester.runRecursive();
