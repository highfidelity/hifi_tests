// This is an automatically generated file, created by auto-tester on May 25 2018, 11:53

user = "NissimHadar/";
repository = "hifi_tests/";
branch = "DailyTests/";

var autoTester = Script.require("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/content/entity/zone/zoneOrientation/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/content/entity/zone/create/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/content/entity/zone/ambientLightZoneEffects/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/content/entity/zone/ambientLightInheritance/test.js?raw=true");

autoTester.runRecursive();
