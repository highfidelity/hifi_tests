if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Sphere protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');

    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "Sphere";
    
    entityProperties.dimensions = { x: 123.0, y: 12334.0, z: 2000.0 };
    
    nitpick.addStep("Create a background zone", function () {
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "background",
            position: originPosition,
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0 ),
            
            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: "enabled",
            keyLight:{
                color: { red: 255, green: 255, blue: 255 },
                intensity: 0.8,
                direction: {
                    x: 0.0,
                    y: -0.70710678118,
                    z: -0.70710678118
                }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { red: 255, green: 255, blue: 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            }
        };
        backgroundZone = Entities.addEntity(zoneProperties);
    });
    
    nitpick.addStep("Prepare result box, green if passed, red if failed", function () {
        setup();
    });
    nitpick.addStepSnapshot("Check that box is white (testing the tester...)");

    nitpick.addStep("Set up sphere", function () {
        object = Entities.addEntity(entityProperties);
    });

    nitpick.addStep("Test sphere", function () {
        var getProperties = Entities.getEntityProperties(object);
        showResults(compareObjects(entityProperties, getProperties));
    });
    nitpick.addStepSnapshot("Show result");

    nitpick.addStep("Clean up after test", function () {
        teardown();
        Entities.deleteEntity(backgroundZone);
        Entities.deleteEntity(object);
    });

    var result = nitpick.runTest(testType);
});
