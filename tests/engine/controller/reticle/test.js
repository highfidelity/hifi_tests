if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Reticle control", Script.resolvePath("."), "primary", function(testType) {
    var zone;
    var previousReticleScale;
    var LIFETIME = 120;

    nitpick.addStep("Show reticle and position in fixed location", function () {
        var assetsRootPath = nitpick.getAssetsRootPath();
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone",
            position: nitpick.getOriginFrame(),
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
            },

            ambientLightMode: "disabled",
            hazeMode: "disabled",
            bloomMode: "disabled",
            shapeType: "box"
        };
        zone = Entities.addEntity(zoneProperties);

        Reticle.visible = true;
        Reticle.setPosition({ x: 960, y: 540 });

        previousReticleScale = Reticle.scale;
        Reticle.setScale(1.0);
    });
    nitpick.addDelay(4);
    nitpick.addStepSnapshot("Default reticle in centre of screen");

    nitpick.addStep("Set scaling to 60 (for large cursor)", function () {
        Reticle.setScale(60.0);
    });
    nitpick.addStepSnapshot("Large cursor");

    nitpick.addStep("Move cursor to left", function () {
        Reticle.setPosition({ x: 200, y: 540 });
    });
    nitpick.addStepSnapshot("Reticle should have moved to the right");

    nitpick.addStep("Move cursor up", function () {
        Reticle.setPosition({ x: 220, y: 170 });
    });
    nitpick.addStepSnapshot("Reticle should have moved up");

    nitpick.addStep("Hide reticle", function () {
        Reticle.setPosition({ x: 560, y: 200 });
        Reticle.visible = false;
    });
    nitpick.addStepSnapshot("No reticle should be displayed");

    nitpick.addStep("Show reticle", function () {
        Reticle.setScale(1.0);
        Reticle.visible = true;
    });
    nitpick.addStepSnapshot("Normal reticle should be displayed");

    nitpick.addStep("Cleanup", function() {
        Entities.deleteEntity(zone);
        Reticle.setScale(previousReticleScale);
    });

    var result = nitpick.runTest(testType);
});