// This is an automatically generated file, created by auto-tester on May 28 2018, 11:03

user = "NissimHadar/";
repository = "hifi_tests/";
branch = "DailyTests/";

var autoTester = Script.require("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/render/shadows/normal/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/render/shadows/grazing/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/render/shadows/front/test.js?raw=true");

autoTester.runRecursive();
