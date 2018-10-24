if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Protocol sanity", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    
    var light;
  
    autoTester.addStep("Set up light", function () {
        var properties = {
            lifetime: LIFETIME,  
            name: "ABCDEFGHIJ1234",
            type: "Light",
            isSpotlight: true,
            color: { red: 11, green: 33, blue: 55 },
            intensity: 2.0,
            falloffRadius: 6.0,
            exponent: 0.25,
            cutoff: 45.0
        };
        light = Entities.addEntity(properties);
    });
    autoTester.addStepSnapshot("Show result");
    
    autoTester.addStep("Test light", function () {
        var properties = Entities.getEntityProperties(light);
        var result = 0;
        var i = 1;
        
        result += (properties.lifetime == LIFETIME) ? 0 : i; i *= 2;
        result += (properties.name == "ABCDEFGHIJ1234") ? 0 : i; i *= 2;
        result += (properties.type == "Light") ? 0 : i; i *= 2;
        result += (properties.isSpotlight == true) ? 0 : i; i *= 2;
        result += (properties.color.red == 11) ? 0 : i; i *= 2;
        result += (properties.color.green == 33) ? 0 : i; i *= 2;
        result += (properties.color.blue == 55) ? 0 : i; i *= 2;
        result += (properties.intensity == 2.0) ? 0 : i; i *= 2;
        result += (properties.falloffRadius == 6.0) ? 0 : i; i *= 2;
        result += (properties.exponent == 0.25) ? 0 : i; i *= 2;
        result += (properties.cutoff == 45.0) ? 0 : i; i *= 2;
    
        showResults(result);
    });
    
    autoTester.addStepSnapshot("Show result");
    
    autoTester.addStep("Clean up after test", function () {
        teardown();
        Entities.deleteEntity(light);
    });
    
    var result = autoTester.runTest(testType);
});
