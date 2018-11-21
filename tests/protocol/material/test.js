if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Material protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    
    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type ="Material";
    
    entityProperties.materialURL = "materialURL";
    entityProperties.priority = 3;
    entityProperties.parentMaterialName = "parent";
    entityProperties.materialMappingMode = "uv";
    entityProperties.materialMappingPos = { x: 0.4, y: 0.7 };
    entityProperties.materialMappingScale = { x: 0.7, y: 0.3 };
    entityProperties.materialMappingRot = 0.02;
    
    entityProperties.materialData = JSON.stringify({ 
        "materials": { 
            "albedo": [0.5, 0.1, 0.2], 
            "roughness": 0.2 
        }
    });
    
    entityProperties.boundingBox = {
        brn: { x: 1.0663206577, y: 3.33795213699, z: 5.55088996887 },
        tfl: { x:  1.235045075416, y: 3.490031242370, z:  5.69143104553222 },
        center: { x: 1.1506829261779785, y: 3.413991689682, z:  5.6211605072 },
        dimensions: { x: 0.1687244176864624, y: 0.15207910537719727, z:  0.14054107666015625 }
    };

    entityProperties.queryAACube = { x: 1.0616825819015503, y: 3.2616827487945557, z: 5.461682319641113, scale: 0.27663490176200867 };
    
    entityProperties.dimensions = { x: 0.1, y: 0.1, z: 0.1 };
    entityProperties.registrationPoint = { x: 0.2, y: 0.4, z: 0.0444 };
    
    entityProperties.originalTextures = {};

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

    nitpick.addStep("Set up material", function () {
        object = Entities.addEntity(entityProperties);
    });
    
    nitpick.addStep("Test material", function () {
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
