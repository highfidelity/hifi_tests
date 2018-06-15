// This is an automatically generated file, created by auto-tester on Jun 15 2018, 14:39

user = "highfidelity/";
repository = "hifi_tests/";

Script.include("https://github.com/highfidelity/hifi_tests/blob/RC69/tests/utils/branchUtils.js?raw=true");
branch = getBranch(Script.resolvePath("."), repository) +"/";

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

var repositoryPath = "https://github.com/" + user + repository + "blob/" + branch;
var autoTester = Script.require(repositoryPath + "tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(repositoryPath + "/tests/engine/render/textures/procedural/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/shadows/primaryCamera/normal/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/shadows/primaryCamera/grazing/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/shadows/primaryCamera/front/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/roughness_map/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/roughness/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/opacity/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/normal_map/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/emissive/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/base/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/material/albedo/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/lighting/ponctual/onTransparent/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/geometry/invalidURL/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/effect/highlight/coverage/test.js?raw=true");
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
Script.include(repositoryPath + "/tests/engine/render/effect/bloom/test.js?raw=true");
Script.include(repositoryPath + "/tests/engine/render/antialiasing/test.js?raw=true");

autoTester.runRecursive();
