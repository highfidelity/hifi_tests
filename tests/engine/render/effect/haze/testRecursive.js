// This is an automatically generated file, created by auto-tester on Jun 13 2018, 9:29

user = "highfidelity/";
repository = "hifi_tests/";
branch = "master/";

Test.wait(10000);

var repositoryPath = "https://github.com/" + user + repository + "blob/" + branch;
var autoTester = Script.require(repositoryPath + "tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(repositoryPath + "/tests/engine/render/effect/haze/visible_sky/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/haze/partial_sky/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/haze/none/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/haze/low_range_low_ceiling/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/haze/low_range_high_ceiling/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/haze/low_range_high_base_low_ceiling/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/haze/low_range/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/haze/high_range/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/haze/glare_small/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/haze/glare_large/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/haze/color/test.js?raw=true");

autoTester.runRecursive();
