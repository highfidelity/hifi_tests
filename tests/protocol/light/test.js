if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Light protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    Script.include('../entityProperties.js');
    
    var object;
  
    var setProperties = {
        type: "Light",
        
        isSpotlight: true,
        color: { red: 11, green: 33, blue: 55 },
        intensity: 2.0,
        falloffRadius: 6.0,
        exponent: 0.25,
        cutoff: 45.0
    };

    nitpick.addStep("Set up light", function () {
        object = Entities.addEntity(setProperties);
    });
    
    nitpick.addStep("Test light", function () {
        var getProperties = Entities.getEntityProperties(object);
        showResults(compareObjects(setProperties, getProperties));
    });
    nitpick.addStepSnapshot("Show result");
    
    nitpick.addStep("Clean up after test", function () {
        teardown();
        Entities.deleteEntity(object);
    });
    
    var result = nitpick.runTest(testType);
});
