if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Sphere protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    Script.include('../entityProperties.js');
    
    var object;
  
    entityProperties = { type: "Sphere"};
    entityProperties = { dimensions: { x: 0.1, y: 0.1, z: 0.1 }};
    entityProperties = { materialURL: "materialURL" };
    entityProperties = { materialMappingMode: "uv" };
    entityProperties = { priority: 3 };
    entityProperties = { parentMaterialName: "parent"};
    entityProperties = { materialMappingPos: { x: 0.4, y: 0.7 }};
    entityProperties = { materialMappingScale: { x: 0.7, y: 0.3 }};
    entityProperties = { materialMappingRot: 0.02 };

    entityProperties = {
        materialData: JSON.stringify({
            "materials": {
                "albedo": [0.5, 0.1, 0.2],
                "roughness": 0.2
            }
        })
    };
    
    entityProperties = { originalTextures: {}};

    nitpick.addStep("Set up material", function () {
        object = Entities.addEntity(entityProperties);
    });
    
    nitpick.addStep("Test material", function () {
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
