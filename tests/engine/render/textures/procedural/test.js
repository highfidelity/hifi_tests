Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/RC69/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

var testFiles = [
    ////{ image: "uncompressed_color.ktx", resolution: [2048, 2048] },
    ////{ image: "compressed_color.ktx", resolution: [2048, 2048] },
    { image: "jpeg.jpg", resolution: [8192, 4096] },
];

var testState = {};

autoTester.perform("Texture Rendering", Script.resolvePath("."), "secondary", function(testType) {
    // Test Texture Procedural
    Script.include("../setup.js?raw=true")

    var stageEntities;
    autoTester.addStep("Set up scene", function() {
        stageEntities = setup(autoTester.getOriginFrame());
    });

    var fxaaWasOn;

    autoTester.addStep("Turn off TAA for this test", function () {
        fxaaWasOn = Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff;
        Render.getConfig("RenderMainView.JitterCam").none();
        Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff = true;
    });

    testFiles.forEach(function(props) {
        var maxMip = getMaxMip(props);

        autoTester.addStep("Texture " + props.image, function() {
            testState.textureEntity = createTexture(props);
        });

        autoTester.addStepSnapshot("Full Resolution");
        for (var mip = maxMip; mip > 0; --mip) {
            (function(mip) {
                autoTester.addStep("Update Mip " + mip, function () {
                    updateTextureMip(testState.textureEntity, mip); 
                });
                autoTester.addStepSnapshot("Mip " + mip);
            })(mip);
        }

        autoTester.addStep("Cleanup Texture", function () {
            Entities.deleteEntity(testState.textureEntity);
        });
    });

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < stageEntities.length; i++) {
            Entities.deleteEntity(stageEntities[i]);
        }

        if (!fxaaWasOn) {
            Render.getConfig("RenderMainView.JitterCam").play();
            Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff = false;
        }
    });

    var result = autoTester.runTest(testType);
});
