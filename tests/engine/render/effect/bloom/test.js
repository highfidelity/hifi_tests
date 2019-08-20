if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("effect - bloom", Script.resolvePath("."), "secondary", undefined, function(testType) {
    var pos =  nitpick.getOriginFrame();
    pos.y += 1.0;
    
    var assetsRootPath = nitpick.getAssetsRootPath();
    var MODEL_DIR_URL = assetsRootPath + "models/material_matrix_models/fbx/blender/";
    var MODEL_NAME_SUFFIX = ".fbx";

    var terrain = Entities.addEntity({
        type: 'Box',
        name: 'Terrain',
        shape: 'Cube',
        dimensions: { x: 1000.0, y: 0.2, z: 1000.0 },
        position: { x: pos.x, y: pos.y - 3.0, z: pos.z },
        color: { "blue": 200, "green": 200, "red": 200
        }
    });

    // A shiny object to catch the highlights
    var object = Entities.addEntity({
        type: "Model",
        modelURL: MODEL_DIR_URL + "hifi_metallicV_albedoV_ao" + MODEL_NAME_SUFFIX,
        name: "Shiny Object",
        position: { x: pos.x, y: pos.y + 0.5, z: pos.z - 2.5}
      });

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

    var SKY_URL = Script.resolvePath(assetsRootPath + 'skymaps/Sky_Day-Sun-Mid-photo.texmeta.json');
    var sky = Entities.addEntity({
        type: "Zone",
        name: "Sky",

        position: {x: pos.x, y: pos.y - 2.0, z: pos.z + 25.0},
        rotation: MyAvatar.orientation,    
        dimensions: { x: 10000.0, y: 600.0, z: 10000.0 },

        keyLightMode: "enabled",
        keyLight:{
            color: {"red":255, "green":255, "blue":255},
            direction: {
                x:  0.26317591071128845,
                y: -0.6420201241970062,
                z:  0.2254165291786194
            },
            intensity: 0.8
        },

        skyboxMode: "enabled",
        skybox: {
            color: {"red":255,"green":255,"blue":255},
            url: SKY_URL
        },
        
        ambientLightMode: "enabled",
        ambientLight: {
            ambientURL: SKY_URL
        },

        bloomMode: "disabled",
        bloom: {
            bloomIntensity: 1.0
        }
    });

    nitpick.addStepSnapshot("Bloom is off - no bloom should be visible");
        
    nitpick.addStep("Enable bloom", function () {
        Entities.editEntity(sky, {
            bloomMode: "enabled"
        })
    });
    nitpick.addStepSnapshot("Bloom enabled");

    nitpick.addStep("Clean up",
        function () {
            Entities.deleteEntity(terrain);
            Entities.deleteEntity(object);
            Entities.deleteEntity(sky);
            Overlays.deleteOverlay(normalOverlay);
            Overlays.deleteOverlay(inFrontOverlay);
        }
    );

    var result = nitpick.runTest(testType);
});
