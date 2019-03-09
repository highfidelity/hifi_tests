if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Zone protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');

    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "Zone";

    entityProperties.dimensions = { x: 20.0, y: 3.0, z: 9.75 };

    entityProperties.keyLightMode = "enabled";
    entityProperties.keyLight = {
        color: { "red": 34, "green": 73, "blue": 88 },
        intensity: 0.125,
        direction: {
            "x": 0.0,
            "y": 1.0,
            "z": 0.0
        }
    };

    entityProperties.skyboxMode = "enabled";
    entityProperties.skybox = {
        color: { red: 12, green: 93, blue: 233 },
        url: 'https://skymaps/YellowCube.jpg'
    };

    entityProperties.ambientLightMode = "disabled";
    entityProperties.ambientLight = {
        ambientURL: 'http://skymaps/Sky_Day-Sun-Mid-photo.texmeta.json'
    };

    entityProperties.hazeMode = 'enabled';
    entityProperties.haze = {
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
    };

    entityProperties.bloomMode = "disabled" ;
    entityProperties.bloom = {
        bloomIntensity: 1.0,
        bloomThreshold: 0.875
    };

    entityProperties.flyingAllowed = true;
    entityProperties.ghostingAllowed = false
    entityProperties.filterURL = "http://Filter URL";
    entityProperties.compoundShapeURL = "https://Compound shape URL";
    entityProperties.shapeType = "box";
    entityProperties.registrationPoint = { x: 0.2, y: 0.4, z: 0.0444 };

    nitpick.addStep("Create a zone", function () {
        object = Entities.addEntity(entityProperties);
    });

    nitpick.addStep("Test zone", function () {
        var getProperties = Entities.getEntityProperties(object);
        saveResults(compareObjects(entityProperties, getProperties));
    });

    nitpick.addStep("Clean up after test", function () {
        Entities.deleteEntity(backgroundZone);
        Entities.deleteEntity(object);
    });

    var result = nitpick.runTest(testType);
});
