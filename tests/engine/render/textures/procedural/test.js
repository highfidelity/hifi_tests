if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

var testFiles = [
    ////{ image: "uncompressed_color.ktx", resolution: [2048, 2048] },
    ////{ image: "compressed_color.ktx", resolution: [2048, 2048] },
    { image: "jpeg.jpg", resolution: [8192, 4096] }
];

var testState = {};

nitpick.perform("Texture Rendering", Script.resolvePath("."), "secondary", [["high.win.amd", "tier.os.gpu"], ["high.win.nvidia", "tier.os.gpu"], ["mid", "tier"], ["low.intel", "tier.os.gpu"]], function(testType) {
    // Test Texture Procedural
    Script.include("setup.js?raw=true")

    var stageEntities;
    nitpick.addStep("Set up scene", function() {
        stageEntities = setup(nitpick.getOriginFrame());
    });

    testFiles.forEach(function(props) {
        var maxMip = getMaxMip(props);

        nitpick.addStep("Texture " + props.image, function() {
            testState.textureEntity = createTexture(props);
        });

        nitpick.addStepSnapshot("Full Resolution");
        for (var mip = maxMip; mip > 0; --mip) {
            (function(mip) {
                nitpick.addStep("Update Mip " + mip, function () {
                    updateTextureMip(testState.textureEntity, mip); 
                });
                nitpick.addStepSnapshot("Mip " + mip);
            })(mip);
        }

        nitpick.addStep("Cleanup Texture", function () {
            Entities.deleteEntity(testState.textureEntity);
        });
    });

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < stageEntities.length; i++) {
            Entities.deleteEntity(stageEntities[i]);
        }
    });

    var result = nitpick.runTest(testType);
});
