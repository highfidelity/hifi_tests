var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://raw.githubusercontent.com/" + user + repository + branch + "tests/utils/autoTester.js" );

autoTester.enableAuto();

Script.include("./test.js?raw=true");
