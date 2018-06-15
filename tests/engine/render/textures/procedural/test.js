if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";

Script.include("https://github.com/highfidelity/hifi_tests/blob/RC69/tests/utils/branchUtils.js?raw=true");
if (typeof branch === 'undefined') branch = getBranch(Script.resolvePath("."), repository) +"/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

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
        stageEntities = setup();
    });

    var fxaaWasOn;

    autoTester.addStep("Turn off TAA for this test", function () {
        fxaaWasOn = Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff;
        Render.getConfig("RenderMainView.JitterCam").none();
        Render.getConfig("RenderMainView.Antialiasing").fxaaOnOff = true;
    });

    autoTester.addStep("Position avatar and camera", function() {
        MyAvatar.position = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 0.4, z: 0.0 }));
        validationCamera_translate(Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: -0.2, z: 0.0 }));
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
