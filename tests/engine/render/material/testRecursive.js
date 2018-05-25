// This is an automatically generated file, created by auto-tester on May 25 2018, 11:53

user = "NissimHadar/";
repository = "hifi_tests/";
branch = "DailyTests/";

var autoTester = Script.require("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/render/material/roughness_map/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/render/material/roughness/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/render/material/opacity/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/render/material/normal_map/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/render/material/emissive/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/render/material/base/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/render/material/albedo/test.js?raw=true");

autoTester.runRecursive();
