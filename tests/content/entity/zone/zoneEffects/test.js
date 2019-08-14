if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Zone - Effects on Ambient Lights and Skybox", Script.resolvePath("."), "secondary", undefined, undefined, function(testType) {
    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);

    var origin = Vec3.sum(nitpick.getOriginFrame(), { x: 0.0, y: 1.0, z: 0.0 });

    var assetsRootPath = nitpick.getAssetsRootPath();

    var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
    var MODEL_SCALE = 0.75;
    var MODEL_OFFSET = { x: 0.0, y: 0.65, z: -2.0};

    var LIFETIME = 200.0;

    var createdEntities = [];

    var objectName = "hifi_roughnessV00_metallicV_albedoV_ao";
    var objectProperties = {
        lifetime: LIFETIME,
        type: "Model",
        modelURL: assetsRootPath + 'models/material_matrix_models/fbx/blender/' + objectName + '.fbx',
        name: objectName,
        position: Vec3.sum(origin, MODEL_OFFSET),
        rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
        dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
        visible: true,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
    };
    createdEntities.push(Entities.addEntity(objectProperties));

    // Setup 4 zones
    var zone1Dimensions = { x: 10.0, y: 10.0, z: 40.0};
    var zone2Dimensions = { x:  8.0, y: 10.0, z: 20.0};
    var zone3Dimensions = { x:  4.0, y: 10.0, z: 30.0};
    var zone4Dimensions = { x:  2.0, y: 10.0, z: 10.0};

    var BRIGHT_SKY_URL = assetsRootPath + 'skymaps/Sky_Day-Sun-Mid-photo.texmeta.json';
    var CLOUDY_SKY_URL = assetsRootPath + 'skymaps/ThickCloudsWater2.jpg';
    var NIGHT_SKY_URL = assetsRootPath + 'skymaps/FullMoon1024Compressed.jpg';
    var HDR_SKY_URL = assetsRootPath + 'skymaps/grace.exr';

    //Add test steps, These may be called via the timing mechanism for auto-testing,  
    // or stepped through with the space bar
    nitpick.addStep("Setup object and zones", function () {
        var zone1properties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "Zone 1",

            position: Vec3.sum(origin, { x: 0.0, y: -2.0, z: -25.0}),
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
            dimensions: zone1Dimensions,

            keyLightMode: "enabled",
            keyLight:{
                color: {"red":255,"green":255,"blue":255},
                direction: {
                    "x": 0.037007175385951996,
                    "y": -0.7071067690849304,
                    "z": -0.7061376571655273
                },
                intensity: 0.8
            },

            skyboxMode: "enabled",
            skybox:{
                color: {"red":255,"green":255,"blue":255},
                url: BRIGHT_SKY_URL
            },
            
            ambientLightMode: "enabled",
            ambientLight: {
                ambientURL: BRIGHT_SKY_URL
            }
        };
        createdEntities.push(Entities.addEntity(zone1properties));

        var zone2properties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "Zone 2",

            position: Vec3.sum(origin, { x: 0.0, y: -2.0, z: -25.0}),
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
            dimensions: zone2Dimensions,

            keyLightMode: "enabled",
            keyLight:{
                color: {"red":255,"green":255,"blue":255},
                direction: {
                    "x": 0.037007175385951996,
                    "y": -0.7071067690849304,
                    "z": -0.7061376571655273
                },
                intensity: 0.8
            },

            skyboxMode: "enabled",
            skybox:{
                color: {"red":255,"green":255,"blue":255},
                url: CLOUDY_SKY_URL
            },
            
            ambientLightMode: "enabled",
            ambientLight: {
                ambientURL: CLOUDY_SKY_URL
            }
        };
        createdEntities.push(Entities.addEntity(zone2properties));

        var zone3properties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "Zone 3",

            position: Vec3.sum(origin, { x: 0.0, y: -2.0, z: -25.0}),
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
            dimensions: zone3Dimensions,

            keyLightMode: "enabled",
            keyLight:{
                color: {"red":255,"green":255,"blue":255},
                direction: {
                    "x": 0.037007175385951996,
                    "y": -0.7071067690849304,
                    "z": -0.7061376571655273
                },
                intensity: 0.8
            },

            skyboxMode: "enabled",
            skybox:{
                color: {"red":255,"green":255,"blue":255},
                url: NIGHT_SKY_URL
            },
            
            ambientLightMode: "enabled",
            ambientLight: {
                ambientURL: NIGHT_SKY_URL
            }
        };
        createdEntities.push(Entities.addEntity(zone3properties));

        var zone4properties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "Zone 4",

            position: Vec3.sum(origin, { x: 0.0, y: -2.0, z: -25.0}),
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
            dimensions: zone4Dimensions,

            keyLightMode: "enabled",
            keyLight:{
                color: {"red":255,"green":255,"blue":255},
                direction: {
                    "x": 0.0,
                    "y": -1.0,
                    "z": 0.0
                },
                intensity: 0.8
            },

            skyboxMode: "enabled",
            skybox:{
                color: {"red":255,"green":255,"blue":255},
                url: HDR_SKY_URL
            },
            
            ambientLightMode: "enabled",
            ambientLight: {
                ambientURL: HDR_SKY_URL,
                ambientIntensity: 1.0
            }
        };
        createdEntities.push(Entities.addEntity(zone4properties));
    });

    nitpick.addStepSnapshot("Verify no skybox");
    
    nitpick.addStep("Move forward", function () {
        var position = { x: 0.0, y: 0.0, z: -7.5 };
        MyAvatar.position = Vec3.sum(origin, position);
        validationCamera_setTranslation(position);
        
        Entities.editEntity(createdEntities[0], { position: Vec3.sum(MyAvatar.position, MODEL_OFFSET) });
    });
    nitpick.addDelay(3);
    nitpick.addStepSnapshot("Verify bright sky");
     
    nitpick.addStep("Move forward again", function () {
        var position = { x: 0.0, y: 0.0, z: -12.5 };
        MyAvatar.position = Vec3.sum(origin, position);
        validationCamera_setTranslation(position);

        Entities.editEntity(createdEntities[0], { position: Vec3.sum(MyAvatar.position, MODEL_OFFSET) });
    });
    nitpick.addDelay(3);
    nitpick.addStepSnapshot("Verify night");
        
    nitpick.addStep("Moving forward and right", function () {
        var position = { x: 3.0, y: 0.0, z: -17.5 };
        MyAvatar.position = Vec3.sum(origin, position);
        validationCamera_setTranslation(position);

        Entities.editEntity(createdEntities[0], { position: Vec3.sum(MyAvatar.position, MODEL_OFFSET) });
    });
    nitpick.addDelay(3);
    nitpick.addStepSnapshot("Verify in cloudy zone");
        
    nitpick.addStep("Move left", function () {
        var position = { x: 0.0, y: 0.0, z: -17.5 };
        MyAvatar.position = Vec3.sum(origin, position);
        validationCamera_setTranslation(position);
        
        Entities.editEntity(createdEntities[0], { position: Vec3.sum(MyAvatar.position, MODEL_OFFSET) });
    });
    nitpick.addDelay(3);
    nitpick.addStepSnapshot("Verify in dark zone");
        
    nitpick.addStep("Move center", function () {
        var position = { x: 0.0, y: 0.0, z: -25.0 };
        MyAvatar.position = Vec3.sum(origin, position);
        validationCamera_setTranslation(position);
        
        Entities.editEntity(createdEntities[0], { position: Vec3.sum(MyAvatar.position, MODEL_OFFSET) });
    });
    nitpick.addDelay(3);
    nitpick.addStepSnapshot("Verify in high dynamic zone");
        
    nitpick.addStep("Cleanup", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    
    var result = nitpick.runTest(testType);
});
