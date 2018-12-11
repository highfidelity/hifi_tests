if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Text protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');

    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "Text";
    
    entityProperties.dimensions = { x: 123.0, y: 12334.0, z: 0.01 };
    entityProperties.text = "this is a test text";
    entityProperties.lineHeight = 0.32;
    entityProperties.textColor = { red: 43, green: 56, blue: 91 };
    entityProperties.backgroundColor = { red: 12, green: 200, blue: 211 };
    entityProperties.faceCamera = true;

    nitpick.addStep("Set up text", function () {
        object = Entities.addEntity(entityProperties);
    });

    nitpick.addStep("Test text", function () {
        var getProperties = Entities.getEntityProperties(object);
        saveResults(compareObjects(entityProperties, getProperties));
    });

    nitpick.addStep("Clean up after test", function () {
        Entities.deleteEntity(backgroundZone);
        Entities.deleteEntity(object);
    });

    var result = nitpick.runTest(testType);
});
