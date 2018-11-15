if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Zone protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    
    var object;
    
    var setProperties = {
        Script.include('../entityProperties.js');
        
        type: "Zone",

        dimensions: { x: 20.0, y: 3.0, z: 9.75 },

        keyLightMode: "enabled",
        keyLight:{
            color: { "red": 34, "green": 73, "blue": 88 },
            intensity: 0.125,
            direction: {
                "x": 0.0,
                "y": 1.0,
                "z": 0.0
            }
        },

        skyboxMode: "enabled",
        skybox: {
            color: { red: 12, green: 93, blue: 233 },
            url: assetsRootPath + 'skymaps/YellowCube.jpg'
        },
                    
        ambientLightMode: "disabled",
        ambientLight: {
            ambientURL: assetsRootPath + 'skymaps/Sky_Day-Sun-Mid-photo.texmeta.json'
        },
        
        hazeMode: 'enabled',
        haze: {
            hazeRange: 502.5,
            hazeColor: { red: 153, green: 107, blue: 47 },
            hazeGlareColor: { red: 53, green: 64, blue: 128 },
            hazeEnableGlare: true,
            hazeGlareAngle: 64.5,
            hazeAltitudeEffect: true,
            hazeCeiling: 5432.0,
            hazeBaseRef: 1423.0,
            hazeBackgroundBlend: 0.375,
            hazeAttenuateKeyLight: false,
            hazeKeyLightRange: 1000.0,
            hazeKeyLightAltitude: 2343.0
        },

        bloomMode: "disabled",
        bloom: {
            bloomIntensity: 1.0,
            bloomThreshold: 0.875
        },

        flyingAllowed: true,
        ghostingAllowed: false,
        
        filterURL: "http://Filter URL",
        compoundShapeURL: "https://Compound shape URL",

        shapeType: "box",
    };

    autoTester.addStep("Create a zone", function () {
        object = Entities.addEntity(setProperties);
    });
    
    autoTester.addStep("Test zone", function () {
        var getProperties = Entities.getEntityProperties(object);
        showResults(compareObjects(setProperties, getProperties));
    });
    autoTester.addStepSnapshot("Show result");
    
    autoTester.addStep("Clean up after test", function () {
        teardown();
        Entities.deleteEntity(object);
    });
    
    var result = autoTester.runTest(testType);
});
