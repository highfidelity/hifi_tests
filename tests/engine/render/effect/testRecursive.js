// This is an automatically generated file, created by auto-tester on Jun 21 2018, 14:15

Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/RC69/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

var repositoryPath = autoTester.getRepositoryPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include(repositoryPath + "engine/render/effect/highlight/coverage/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/visible_sky/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/partial_sky/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/none/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/low_range_low_ceiling/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/low_range_high_ceiling/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/low_range_high_base_low_ceiling/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/low_range/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/high_range/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/glare_small/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/glare_large/test.js");
Script.include(repositoryPath + "engine/render/effect/haze/color/test.js");
Script.include(repositoryPath + "engine/render/effect/bloom/test.js");

autoTester.runRecursive();
