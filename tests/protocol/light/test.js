if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Light protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    
    var object;
  
    var entityProperties = {}
    entityProperties.type = "Light";
    entityProperties.position = { x: 1.2, y: 3.4, z: 5.6 };
    entityProperties.dimensions = { x: 1.1, y: 3.3, z: 5.5 };
    entityProperties.color =  { red: 11, green: 33, blue: 55 };
    entityProperties.intensity =  2.0;
    entityProperties.falloffRadius = 6.0;
    entityProperties.isSpotlight = true;
    entityProperties.exponent = 0.25;
    entityProperties.cutoff = 45.0;
    entityProperties.isVisibleInSecondaryCamera = true;

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
        Entities.deleteEntity(object);
    });
    
    var result = nitpick.runTest(testType);
});
