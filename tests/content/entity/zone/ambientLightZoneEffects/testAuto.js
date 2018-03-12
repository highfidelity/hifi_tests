var autoTester = Script.require("https://raw.githubusercontent.com/NissimHadar/hifi_tests/addRecursionToAutotester/tests/utils/autoTester.js" );

autoTester.enableAuto();

Script.include("./test.js?raw=true");
