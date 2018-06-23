Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("effect - bloom", Script.resolvePath("."), "secondary", function(testType) {
    var pos =  MyAvatar.position;

    var TESTS_URL = "https://raw.githubusercontent.com/highfidelity/hifi_tests/" + autoTester.getBranch() + "/";
    var MODEL_DIR_URL = TESTS_URL + "assets/models/material_matrix_models/fbx/blender/";
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
        position: { x: pos.x, y: pos.y + 0.5, z: pos.z - 2.5},      
        dimensions:{ x: 1.0, y: 1.0, z: 1.0 },
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

    var SKY_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/Sky_Day-Sun-Mid-photo.texmeta.json');
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
        }
    });

    var bloomConfig = Render.getConfig("RenderMainView.Bloom")
    var bloomThresholdConfig = Render.getConfig("RenderMainView.BloomThreshold")
    var secondaryBloomConfig = Render.getConfig("SecondaryCameraJob.Bloom")
    var secondaryBloomThresholdConfig = Render.getConfig("SecondaryCameraJob.BloomThreshold")

    var defaultEnabled = bloomConfig.enabled
    var defaultIntensity = bloomConfig.intensity
    var defaultThreshold = bloomThresholdConfig.threshold
        
    bloomConfig.enabled = false;
    secondaryBloomConfig.enabled = false;

    autoTester.addStepSnapshot("Bloom is off - no bloom should be visible");
        
    autoTester.addStep("Enable bloom", function () {
        bloomConfig.intensity = 1.0
        secondaryBloomConfig.intensity = 1.0
        bloomConfig.enabled = true;
        secondaryBloomConfig.enabled = true;
    });
    autoTester.addStepSnapshot("Bloom enabled");

    autoTester.addStep("Clean up",
        function () {
            Entities.deleteEntity(terrain);
            Entities.deleteEntity(object);
            Entities.deleteEntity(sky);
            Overlays.deleteOverlay(normalOverlay);
            Overlays.deleteOverlay(inFrontOverlay);
            bloomConfig.enabled = defaultEnabled
            bloomConfig.intensity = defaultIntensity
            bloomThresholdConfig.threshold = defaultThreshold
            secondaryBloomConfig.enabled = defaultEnabled
            secondaryBloomConfig.intensity = defaultIntensity
            secondaryBloomThresholdConfig.threshold = defaultThreshold
        }
    );

    var result = autoTester.runTest(testType);
});
