if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("material protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    
    var object;
  
    var setProperties = {
        Script.include('../entityProperties.js');
        
        type: "Material",
        
        dimensions: { x: 0.1, y: 0.1, z: 0.1 },
        registrationPoint: { x: 0.2, y: 0.4, z: 0.0444 },
        materialURL: "materialURL",
        materialMappingMode: "uv",
        priority: 3,
        parentMaterialName: "parent",
        materialMappingPos: { x: 0.4, y: 0.7 },
        materialMappingScale: { x: 0.7, y: 0.3 },
        materialMappingRot: 0.02,
        materialData: JSON.stringify({ 
            "materials": { 
                "albedo": [0.5, 0.1, 0.2], 
                "roughness": 0.2 
            }
        }),
        originalTextures: {},
        owningAvatarID: "{87654321-1234-6666-4444-123412349876}",
    };

    autoTester.addStep("Set up material", function () {
        object = Entities.addEntity(setProperties);
    });
    
    autoTester.addStep("Test material", function () {
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
