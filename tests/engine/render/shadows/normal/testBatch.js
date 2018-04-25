var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.enableAuto();
autoTester.enableBatch();

Window.location = "localhost/8000,8000,8000/0,0.0,0.0,1.0";

Script.include("./test.js?raw=true");
