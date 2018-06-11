// This is an automatically generated file, created by auto-tester on Jun 10 2018, 13:53

user = "highfidelity/";
repository = "hifi_tests/";
branch = "master/";

Test.wait(10000);

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/engine/render/material/roughness_map/test.js?raw=true");
Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/engine/render/material/roughness/test.js?raw=true");
Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/engine/render/material/opacity/test.js?raw=true");
Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/engine/render/material/normal_map/test.js?raw=true");
Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/engine/render/material/emissive/test.js?raw=true");
Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/engine/render/material/base/test.js?raw=true");
Script.include("https://github.com/" + user + repository + "blob/" + branch + "/tests/engine/render/material/albedo/test.js?raw=true");

autoTester.runRecursive();
