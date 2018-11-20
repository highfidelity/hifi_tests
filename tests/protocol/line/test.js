if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Line protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    
    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "Line";
        
    entityProperties.dimensions = { x: 2000, y: 4000, z: 8888 };
    entityProperties.linePoints = [
        { x: 510.4, y: 37.25, z:  100 },
        { x: 510.4, y: 37.25, z:  101 },
        { x: 510.4, y: 37.25, z:  102 },
        { x: 510.4, y: 37.25, z:  103 },
        { x: 510.4, y: 37.25, z:  104 },
        { x: 510.4, y: 37.25, z:  105 },
        { x: 510.4, y: 37.25, z:  106 },
        { x: 510.4, y: 37.25, z:  107 },
        { x: 510.4, y: 37.25, z:  108 },
        { x: 510.4, y: 37.25, z:  109 },
        { x: 510.4, y: 37.25, z:  110 },
        { x: 510.4, y: 37.25, z:  111 },
        { x: 510.4, y: 37.25, z:  112 },
        { x: 510.4, y: 37.25, z:  113 },
        { x: 510.4, y: 37.25, z:  114 },
        { x: 510.4, y: 37.25, z:  115 },
        { x: 510.4, y: 37.25, z:  116 },
        { x: 510.4, y: 37.25, z:  117 },
        { x: 510.4, y: 37.25, z:  118 },
        { x: 510.4, y: 37.25, z:  119 },
        { x: 510.4, y: 37.25, z:  120 },
        { x: 510.4, y: 37.25, z:  121 },
        { x: 510.4, y: 37.25, z:  122 },
        { x: 510.4, y: 37.25, z:  123 },
        { x: 510.4, y: 37.25, z:  124 },
        { x: 510.4, y: 37.25, z:  125 },
        { x: 510.4, y: 37.25, z:  126 },
        { x: 510.4, y: 37.25, z:  127 },
        { x: 510.4, y: 37.25, z:  128 },
        { x: 510.4, y: 37.25, z:  129 },
        { x: 510.4, y: 37.25, z:  130 },
        { x: 510.4, y: 37.25, z:  131 },
        { x: 510.4, y: 37.25, z:  132 },
        { x: 510.4, y: 37.25, z:  133 },
        { x: 510.4, y: 37.25, z:  134 },
        { x: 510.4, y: 37.25, z:  135 }
    ];
    entityProperties.lineWidth = 123.5;
    entityProperties.color = { red: 85, green: 170, blue: 151 };

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

    nitpick.addStep("Set up line", function () {
        object = Entities.addEntity(entityProperties);
    });
    
    nitpick.addStep("Test line", function () {
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
