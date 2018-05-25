// This is an automatically generated file, created by auto-tester on May 25 2018, 11:53

user = "NissimHadar/";
repository = "hifi_tests/";
branch = "DailyTests/";

var autoTester = Script.require("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/interaction/pointer/laser/renderState/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/interaction/pointer/laser/lockEndUUID/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/interaction/pointer/laser/lockEnd/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/interaction/pointer/laser/ignore/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/interaction/pointer/laser/faceAvatar/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/interaction/pointer/laser/distanceScaleEnd/test.js?raw=true");
Script.include("https://github.com/NissimHadar/hifi_tests/blob/DailyTests/tests/engine/interaction/pointer/laser/centerEndY/test.js?raw=true");

autoTester.runRecursive();
