if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Material protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", function(testType) {
    Script.include('../common.js');
    setup();
    
    var object;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type ="Material";
    
    entityProperties.materialURL = "materialURL";
    entityProperties.priority = 3;
    entityProperties.parentMaterialName = "parent";
    entityProperties.materialMappingMode = "uv";
    entityProperties.materialMappingPos = { x: 0.4, y: 0.7 };
    entityProperties.materialMappingScale = { x: 0.7, y: 0.3 };
    entityProperties.materialMappingRot = 0.02;
    
    entityProperties.materialData = JSON.stringify({ 
        "materials": { 
            "albedo": [0.5, 0.1, 0.2], 
            "roughness": 0.2 
        }
    });
    
    entityProperties.boundingBox = {
        brn: { x: 1.0663206577, y: 3.33795213699, z: 5.55088996887 },
        tfl: { x:  1.235045075416, y: 3.490031242370, z:  5.69143104553222 },
        center: { x: 1.1506829261779785, y: 3.413991689682, z:  5.6211605072 },
        dimensions: { x: 0.1687244176864624, y: 0.15207910537719727, z:  0.14054107666015625 }
    };

    entityProperties.queryAACube = { x: 1.0616825819015503, y: 3.2616827487945557, z: 5.461682319641113, scale: 0.27663490176200867 };
    
    entityProperties.dimensions = { x: 0.1, y: 0.1, z: 0.1 };
    entityProperties.registrationPoint = { x: 0.2, y: 0.4, z: 0.0444 };
    
    entityProperties.originalTextures = {};

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
