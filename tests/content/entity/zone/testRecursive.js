// This is an automatically generated file, created by auto-tester on May 21 2018, 16:55

user = "NissimHadar/"
repository = "hifi_tests/"
branch = "newAvatar/"

var autoTester = Script.require("https://github.com/NissimHadar/hifi_tests/blob/newAvatar/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/NissimHadar/hifi_tests/blob/newAvatar/tests/content/entity/zone/zoneOrientation/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/newAvatar/tests/content/entity/zone/create/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/newAvatar/tests/content/entity/zone/ambientLightZoneEffects/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/newAvatar/tests/content/entity/zone/ambientLightInheritance/test.js?raw=true");

autoTester.runRecursive();
