if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Reticle control", Script.resolvePath("."), "primary", function(testType) {
    var zone;
    var previousReticleScale;
    var LIFETIME = 120;

    autoTester.addStep("Show reticle and position in fixed location", function () {
        var assetsRootPath = autoTester.getAssetsRootPath();
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone",
            position: autoTester.getOriginFrame(),
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),

            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: "enabled",
            keyLight:{
                color: { red: 255, green: 255, blue: 255 },
                intensity: 0.8,
                direction: { x: 0.0, y: -0.70710678118, z: -0.70710678118 }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { red: 255, green: 255, blue: 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            }
        };
        zone = Entities.addEntity(zoneProperties);

        Reticle.visible = true;
        Reticle.setPosition({ x: 960, y: 540 });

        previousReticleScale = Reticle.scale;
        Reticle.setScale(1.0);
    });
    autoTester.addDelay(4);
    autoTester.addStepSnapshot("Default reticle in centre of screen");

    autoTester.addStep("Set scaling to 60 (for large cursor)", function () {
        Reticle.setScale(60.0);
    });
    autoTester.addStepSnapshot("Large cursor");

    autoTester.addStep("Move cursor to left", function () {
        Reticle.setPosition({ x: 200, y: 540 });
    });
    autoTester.addStepSnapshot("Reticle should have moved to the right");

    autoTester.addStep("Move cursor up", function () {
        Reticle.setPosition({ x: 220, y: 170 });
    });
    autoTester.addStepSnapshot("Reticle should have moved up");

    autoTester.addStep("Hide reticle", function () {
        Reticle.setPosition({ x: 560, y: 200 });
        Reticle.visible = false;
    });
    autoTester.addStepSnapshot("No reticle should be displayed");

    autoTester.addStep("Show reticle", function () {
        Reticle.setScale(1.0);
        Reticle.visible = true;
    });
    autoTester.addStepSnapshot("Normal reticle should be displayed");

    autoTester.addStep("Cleanup", function() {
        Entities.deleteEntity(zone);
        Reticle.setScale(previousReticleScale);
    });

    var result = autoTester.runTest(testType);
});