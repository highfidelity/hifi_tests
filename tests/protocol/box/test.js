if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Box protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    Script.include('../entityProperties.js');
    
    var object;
  
    entityProperties.type = "Box";

    nitpick.addStep("Set up box", function () {
        object = Entities.addEntity(entityProperties);
    });
    
    nitpick.addStep("Test box", function () {
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
