var repository = "highfidelity";
var branch = "master;
var autoTester = Script.require("https://raw.githubusercontent.com/" + repository + "/hifi_tests/" + branch +"/tests/utils/autoTester.js" );

autoTester.enableAuto();

Script.include("./test.js?raw=true");
