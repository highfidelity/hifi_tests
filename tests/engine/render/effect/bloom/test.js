if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("effect - bloom", Script.resolvePath("."), "secondary", undefined, function(testType) {

    // standard test stage and model loaders
    Script.include(nitpick.getUtilsRootPath() + "test_stageAndModels.js?raw=true")

    // List here all the entries of the Material Matrix tested in this test
    var TEST_CASES = [
     //   {name:"hifi_normalM_albedoV_ao",  a:-1.5, b:-0.5, c:0},
        {name:"hifi_metallicV_albedoV_ao",  a:-1.5, b:0.0, c:1},  
    ];
    
    // Add the test Cases
    //var OFFSET = { x: 0.0, y: -1.0, z: -0.1 };
    var OFFSET = { x: 0.0, y: -0.0, z: 0.0 };
    var createdEntities = [];
    // Add the test Cases
    var initData = {
        flags : { 
            hasZone: true,
            hasKeyLight: true,
            hasKeyLightShadow: true,
            hasAmbientLight: true,
            hasBloom: false,
            darkStage: true,
        },
        originFrame: nitpick.getOriginFrame()
    };

    // First step, setup scene
    nitpick.addStep("Set up test case", function () {
        createdEntities = addCases(TEST_CASES, initData);
        validationCamera_translate(OFFSET);
    });


    
  

    // A shiny object to catch the highlights
 /*   var object = Entities.addEntity({
        type: "Model",
        modelURL: MODEL_DIR_URL + "hifi_metallicV_albedoV_ao" + MODEL_NAME_SUFFIX,
        name: "Shiny Object",
        position: { x: pos.x, y: pos.y + 0.5, z: pos.z - 2.5}
      });
    createdEntities.push(object);

    var inFrontOverlay = Overlays.addOverlay("sphere", {
        position: { x: pos.x-1.0, y: pos.y + 0.5, z: pos.z - 2.5},
        size: 1.0,
        color: { red: 0, green: 0, blue: 255},
        alpha: 1,
        solid: true,
        drawInFront: false,
        isVisibleInSecondaryCamera: true
    });

    var normalOverlay = Overlays.addOverlay("sphere", {
        position: { x: pos.x+1.0, y: pos.y + 0.5, z: pos.z - 2.5},
        size: 1.0,
        color: { red: 255, green: 0, blue: 0},
        alpha: 1,
        solid: true,
        drawInFront: true,
        isVisibleInSecondaryCamera: true
    });
*/
   

    nitpick.addStepSnapshot("Bloom is off - no bloom should be visible");
        
    nitpick.addStep("Enable bloom", function () {
        print(JSON.stringify(Entities.getEntityProperties(createdEntities[0], ["bloom"])));
        Entities.editEntity(createdEntities[0], {
            bloomMode: "enabled",
            bloom: {
                bloomIntensity: 1.,
                bloomThreshold: 0.5,
                bloomSize: 1.0,
            }
        })
    });
    nitpick.addStepSnapshot("Bloom enabled");

    nitpick.addStep("Clean up",
        function () {
            for (var i = 0; i < createdEntities.length; i++) {
                Entities.deleteEntity(createdEntities[i]);
            }
         //   Overlays.deleteOverlay(normalOverlay);
           // Overlays.deleteOverlay(inFrontOverlay);
        }
    );

    var result = nitpick.runTest(testType);
});
