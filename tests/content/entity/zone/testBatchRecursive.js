var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.enableRecursive();
autoTester.enableBatch();

Test.wait(3000);

Script.include("ambientLightInheritance/test.js?raw=true");
Script.include("zoneOrientation/test.js?raw=true");

autoTester.runRecursive();
