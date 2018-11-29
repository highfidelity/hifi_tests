if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Polyvox protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');

    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "PolyVox";

    entityProperties.dimensions = { x: 2000.0, y: 2000.0, z: 2000.0 };
    entityProperties.voxelVolumeSize = { x:23, y: 29, z: 31 };
    entityProperties.voxelData="ads23SGResLiIUYoh987fTREdgdgDGdgdgDSDLLIJklj65edrcgddQ7Y"
    entityProperties.PolyVoxSurfaceStyle = 3;

    entityProperties.xTextureURL = "http://xTextureURL";
    entityProperties.yTextureURL = "http://yTextureURL";
    entityProperties.zTextureURL = "http://zTextureURL";

    entityProperties.xNNeighborID = "{24454321-1434-6655-4344-123565649876}"
    entityProperties.yNNeighborID = "{12234311-1134-6346-4455-123565653876}"
    entityProperties.zNNeighborID = "{85533546-3444-4456-6448-345345654335}"
 
    entityProperties.xPNeighborID = "{87654321-1234-6666-4444-123412349876}"
    entityProperties.yPNeighborID = "{12312311-1134-6346-4455-123434553876}"
    entityProperties.zPNeighborID = "{85423546-3434-4566-6388-345345654335}"
    
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
                color: { "red": 255, "green": 255, "blue": 255 },
                intensity: 0.8,
                direction: {
                    "x": 0.0,
                    "y": -0.70710678118,
                    "z": -0.70710678118
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

    nitpick.addStep("Set up polyvox", function () {
        object = Entities.addEntity(entityProperties);
    });

    nitpick.addStep("Test polyvox", function () {
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
