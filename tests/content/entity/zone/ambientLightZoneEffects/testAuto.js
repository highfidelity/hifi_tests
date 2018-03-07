var autoTester = Script.require("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/autoTester.js" );

autoTester.enableAuto();

Script.include("./test.js?raw=true");
