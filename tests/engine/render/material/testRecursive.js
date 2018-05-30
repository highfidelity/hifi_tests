// This is an automatically generated file, created by auto-tester on May 30 2018, 10:41

user = "highfidelity/";
repository = "hifi_tests/";
branch = "master/";

var autoTester = Script.require("https://github.com/highfidelity/hifi_tests/blob/master/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/material/roughness_map/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/material/roughness/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/material/opacity/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/material/normal_map/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/material/emissive/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/material/base/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/material/albedo/test.js?raw=true");

autoTester.runRecursive();
