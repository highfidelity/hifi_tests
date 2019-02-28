if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Zone - Effects on Ambient Lights and Skybox", Script.resolvePath("."), "secondary", function(testType) {
    MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);

    var avatarOriginPosition = nitpick.getOriginFrame();
    avatarOriginPosition = Vec3.sum(avatarOriginPosition, { x: 0.0, y: 1.0, z: 0.0 });

    var previousSkeletonURL;

    var assetsRootPath = nitpick.getAssetsRootPath();

    var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
    var MODEL_SCALE = 0.75;
    var MODEL_OFFSET = { x: 0.0, y: 0.65, z: -2.0};

    var LIFETIME = 60.0;

    var object;
    var zone1;
    var zone2;
    var zone3;

    var objectName = "hifi_roughnessV00_metallicV_albedoV_ao";
    var objectProperties = {
        lifetime: LIFETIME,
        type: "Model",
        modelURL: assetsRootPath + 'models/material_matrix_models/fbx/blender/' + objectName + '.fbx',
        name: objectName,
        position: Vec3.sum(avatarOriginPosition, MODEL_OFFSET),    
        rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0),
        dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
        visible: true,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
    };
    object = Entities.addEntity(objectProperties);

    // Setup 3 zones
    var zone1Dimensions = { x: 10.0, y: 10.0, z: 40.0};
    var zone2Dimensions = { x:  8.0, y: 10.0, z: 20.0};
    var zone3Dimensions = { x:  4.0, y: 10.0, z: 30.0};

    var BRIGHT_SKY_URL = assetsRootPath + 'skymaps/Sky_Day-Sun-Mid-photo.texmeta.json';
    var CLOUDY_SKY_URL = assetsRootPath + 'skymaps/ThickCloudsWater2.jpg';
    var NIGHT_SKY_URL = assetsRootPath + 'skymaps/FullMoon1024Compressed.jpg';

    //Add test steps, These may be called via the timing mechanism for auto-testing,  
    // or stepped through with the space bar
    nitpick.addStep("Setup object and zones", function () {
        var zone1properties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "Zone 1",

            position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 2.0, z: MyAvatar.position.z - 25.0},
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
        zone1 = Entities.addEntity(zone1properties);

        var zone2properties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "Zone 2",

            position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 2.0, z: MyAvatar.position.z - 25.0},
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
        zone2 = Entities.addEntity(zone2properties);

        var zone3properties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "Zone 3",

            position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 2.0, z: MyAvatar.position.z - 25.0},
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
        zone3 = Entities.addEntity(zone3properties);
    });

    nitpick.addStep("Setup avatar", function () {
        // Use a specific avatar.  This is needed because we want the avatar's height to be fixed.
        previousSkeletonURL = MyAvatar.skeletonModelURL;
        MyAvatar.skeletonModelURL = "https://highfidelity.com/api/v1/commerce/entity_edition/813addb9-b985-49c8-9912-36fdbb57e04a.fst?certificate_id=MEUCIQDgYR2%2BOrCh5HXeHCm%2BkR0a2JniEO%2BY4y9tbApxCAPo4wIgXZEQdI4cQc%2FstAcr9tFT9k4k%2Fbuj3ufB1aB4W0tjIJc%3D";

        previousScale = MyAvatar.scale;
        MyAvatar.scale = 1.0;
        MyAvatar.setEnableMeshVisible(true);

        // Wait for skeleton to load (for now - only in test mode)
        if (typeof Test !== 'undefined') {
            Test.waitIdle();
        }
    });

    nitpick.addStepSnapshot("Verify no skybox");
    
    nitpick.addStep("Move forward", function () {
        var position = { x: 0.0, y: 0.0, z: -7.5 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, position);
        validationCamera_setTranslation(position);
        
        Entities.editEntity(object, { position: Vec3.sum(MyAvatar.position, MODEL_OFFSET) });
    });
    nitpick.addStepSnapshot("Verify bright sky");
     
    nitpick.addStep("Move forward again", function () {
        var position = { x: 0.0, y: 0.0, z: -12.5 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, position);
        validationCamera_setTranslation(position);

        Entities.editEntity(object, { position: Vec3.sum(MyAvatar.position, MODEL_OFFSET) });
    });
    nitpick.addStepSnapshot("Verify night");
        
    nitpick.addStep("Moving forward and right", function () {
        var position = { x: 3.0, y: 0.0, z: -17.5 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, position);
        validationCamera_setTranslation(position);

        Entities.editEntity(object, { position: Vec3.sum(MyAvatar.position, MODEL_OFFSET) });
    });
    nitpick.addStepSnapshot("Verify in cloudy zone");
        
    nitpick.addStep("Move left", function () {
        var position = { x: 0.0, y: 0.0, z: -17.5 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, position);
        validationCamera_setTranslation(position);
        
        Entities.editEntity(object, { position: Vec3.sum(MyAvatar.position, MODEL_OFFSET) });
    });
    nitpick.addStepSnapshot("Verify in dark zone");
        
    nitpick.addStep("Cleanup", function () {
        MyAvatar.skeletonModelURL = previousSkeletonURL;
        MyAvatar.scale = previousScale;
        MyAvatar.clearJointsData();

        Entities.deleteEntity(object);
        Entities.deleteEntity(zone1);
        Entities.deleteEntity(zone2);
        Entities.deleteEntity(zone3);
    });
    
    var result = nitpick.runTest(testType);
});
