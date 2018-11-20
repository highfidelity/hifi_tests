if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Line protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    
    var object;
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
        Entities.deleteEntity(object);
    });
    
    var result = nitpick.runTest(testType);
});
