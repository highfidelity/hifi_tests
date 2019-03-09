if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
if (typeof nitpick === 'undefined') nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("PolyLine protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');

    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "PolyLine";

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

    entityProperties.normals = [
        { x: 0.4, y: 0.25, z:  0.001 },
        { x: 0.4, y: 0.25, z:  0.002 },
        { x: 0.4, y: 0.25, z:  0.003 },
        { x: 0.4, y: 0.25, z:  0.004 },
        { x: 0.4, y: 0.25, z:  0.005 },
        { x: 0.4, y: 0.25, z:  0.006 },
        { x: 0.4, y: 0.25, z:  0.007 },
        { x: 0.4, y: 0.25, z:  0.008 },
        { x: 0.4, y: 0.25, z:  0.009 },
        { x: 0.4, y: 0.25, z:  0.010 },
        { x: 0.4, y: 0.25, z:  0.011 },
        { x: 0.4, y: 0.25, z:  0.012 },
        { x: 0.4, y: 0.25, z:  0.013 },
        { x: 0.4, y: 0.25, z:  0.014 },
        { x: 0.4, y: 0.25, z:  0.015 },
        { x: 0.4, y: 0.25, z:  0.016 },
        { x: 0.4, y: 0.25, z:  0.017 },
        { x: 0.4, y: 0.25, z:  0.018 },
        { x: 0.4, y: 0.25, z:  0.019 },
        { x: 0.4, y: 0.25, z:  0.020 },
        { x: 0.4, y: 0.25, z:  0.021 },
        { x: 0.4, y: 0.25, z:  0.022 },
        { x: 0.4, y: 0.25, z:  0.023 },
        { x: 0.4, y: 0.25, z:  0.024 },
        { x: 0.4, y: 0.25, z:  0.025 },
        { x: 0.4, y: 0.25, z:  0.026 },
        { x: 0.4, y: 0.25, z:  0.027 },
        { x: 0.4, y: 0.25, z:  0.028 },
        { x: 0.4, y: 0.25, z:  0.029 },
        { x: 0.4, y: 0.25, z:  0.030 },
        { x: 0.4, y: 0.25, z:  0.031 },
        { x: 0.4, y: 0.25, z:  0.032 },
        { x: 0.4, y: 0.25, z:  0.033 },
        { x: 0.4, y: 0.25, z:  0.034 },
        { x: 0.4, y: 0.25, z:  0.035 },
        { x: 0.4, y: 0.25, z:  0.036 }
    ];

    entityProperties.strokeWidths = [
        0.001,
        0.002,
        0.003,
        0.004,
        0.005,
        0.006,
        0.007,
        0.008,
        0.009,
        0.010,
        0.011,
        0.012,
        0.013,
        0.014,
        0.015,
        0.016,
        0.017,
        0.018,
        0.019,
        0.020,
        0.021,
        0.022,
        0.023,
        0.024,
        0.025,
        0.026,
        0.027,
        0.028,
        0.029,
        0.030,
        0.031,
        0.032,
        0.033,
        0.034,
        0.035,
        0.036
    ];

    entityProperties.color = { red: 85, green: 170, blue: 151 };
    entityProperties.textures = "http://textureURL";
    entityProperties.isUVModeStretch = false;
    entityProperties.registrationPoint = { x: 0.9999, y: 0.9989, z: 0.7406 };

    nitpick.addStep("Set up polyline", function () {
        object = Entities.addEntity(entityProperties);
    });

    nitpick.addStep("Test polyline", function () {
        var getProperties = Entities.getEntityProperties(object);
        saveResults(compareObjects(entityProperties, getProperties));
    });

    nitpick.addStep("Clean up after test", function () {
        Entities.deleteEntity(backgroundZone);
        Entities.deleteEntity(object);
    });

    var result = nitpick.runTest(testType);
});
