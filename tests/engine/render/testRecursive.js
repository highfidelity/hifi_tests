// This is an automatically generated file, created by nitpick
PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

var testsRootPath = nitpick.getTestsRootPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

nitpick.enableRecursive();
nitpick.enableAuto();

Script.include(testsRootPath + "engine/render/shadows/normal/test.js");
Script.include(testsRootPath + "engine/render/shadows/grazing/test.js");
Script.include(testsRootPath + "engine/render/shadows/front/test.js");
Script.include(testsRootPath + "engine/render/mesh/MyAvatar/visibility/test.js");
Script.include(testsRootPath + "engine/render/mesh/MyAvatar/scale/test.js");
Script.include(testsRootPath + "engine/render/material/roughness_map/test.js");
Script.include(testsRootPath + "engine/render/material/roughness/test.js");
Script.include(testsRootPath + "engine/render/material/opacity/test.js");
Script.include(testsRootPath + "engine/render/material/normal_map/test.js");
Script.include(testsRootPath + "engine/render/material/emissive/test.js");
Script.include(testsRootPath + "engine/render/material/base/test.js");
Script.include(testsRootPath + "engine/render/material/albedo/test.js");
Script.include(testsRootPath + "engine/render/lod/overlay/model/test.js");
Script.include(testsRootPath + "engine/render/lighting/ponctual/onTransparent/test.js");
Script.include(testsRootPath + "engine/render/geometry/invalidURL/test.js");
Script.include(testsRootPath + "engine/render/effect/highlight/coverage/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/visible_sky/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/partial_sky/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/none/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/low_range_low_ceiling/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/low_range_high_ceiling/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/low_range_high_base_low_ceiling/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/low_range/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/high_range/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/glare_small/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/glare_large/test.js");
Script.include(testsRootPath + "engine/render/effect/haze/color/test.js");
Script.include(testsRootPath + "engine/render/effect/bloom/test.js");
Script.include(testsRootPath + "engine/render/camera/secondary/test.js");
Script.include(testsRootPath + "engine/render/camera/primary/test.js");

nitpick.runRecursive();
