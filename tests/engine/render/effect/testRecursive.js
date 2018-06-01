// This is an automatically generated file, created by auto-tester on Jun 1 2018, 11:24

user = "highfidelity/";
repository = "hifi_tests/";
branch = "master/";

var autoTester = Script.require("https://github.com/highfidelity/hifi_tests/blob/master/tests/utils/autoTester.js?raw=true");

autoTester.enableRecursive();
autoTester.enableAuto();

Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/highlight/coverage/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/visible_sky/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/partial_sky/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/none/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/low_range_low_ceiling/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/low_range_high_ceiling/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/low_range_high_base_low_ceiling/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/low_range/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/high_range/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/glare_small/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/glare_large/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/haze/color/test.js?raw=true");
Script.include("https://github.com/highfidelity/hifi_tests/blob/master/tests/engine/render/effect/bloom/test.js?raw=true");

autoTester.runRecursive();
