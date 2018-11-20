if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Light protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    
    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "Light";

    entityProperties.cloneable = false;
    entityProperties.cloneLifetime = 200;
    entityProperties.cloneLimit = 1;
    entityProperties.cloneDynamic = true;
    entityProperties.cloneAvatarEntity = false;
    entityProperties.cloneOriginID = "{12345678-4321-5555-7777-123412349876}";
    entityProperties.itemName = "item name";
    entityProperties.itemDescription = "item description";
    entityProperties.itemCategories = "item categories";
    entityProperties.itemArtist = "item artist";
    entityProperties.itemLicense = "item license";
    entityProperties.limitedRun = 123456;
    entityProperties.editionNumber = 876;
    entityProperties.entityInstanceNumber = 345;
    entityProperties.marketplaceID = "market place ID";
    entityProperties.staticCertificateVersion = 2;
    
    entityProperties.position = { x: 1.2, y: 3.4, z: 5.6 };
    entityProperties.color =  { red: 11, green: 33, blue: 55 };
    entityProperties.intensity =  2.0;
    entityProperties.falloffRadius = 6.0;
    entityProperties.isSpotlight = true;
    entityProperties.exponent = 0.25;
    entityProperties.cutoff = 45.0;

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
        var boxProperties = {
            type: "Box",
            name: "box",
            lifetime: LIFETIME,
            color: { red: 255, green: 255, blue: 255 },
            position: Vec3.sum(originPosition, { x: 0.0, y: 1.7, z: -2.0 }),
            dimensions: { x: 1.0, y: 1.0, z: 1.0 },
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        };
        box = Entities.addEntity(boxProperties);
    });
    nitpick.addStepSnapshot("Check that box is white (testing the tester...)");

    nitpick.addStep("Set up light", function () {
        object = Entities.addEntity(entityProperties);
    });
    
    nitpick.addStep("Test light", function () {
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
