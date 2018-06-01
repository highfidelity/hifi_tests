// This is an automatically generated file, created by auto-tester on Jun 1 2018, 11:24

user = "highfidelity/";
repository = "hifi_tests/";
branch = "master/";

var autoTester = Script.require("https://github.com/highfidelity/hifi_tests/blob/master/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/material/create/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/material/apply/overlays/model/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/material/apply/entities/shape/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/material/apply/entities/model/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/content/entity/material/apply/avatars/test.js?raw=true");

autoTester.runRecursive();
