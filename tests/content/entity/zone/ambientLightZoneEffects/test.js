var autoTester = Script.require("https://raw.githubusercontent.com/NissimHadar/hifi_tests/addRecursionToAutotester/tests/utils/autoTester.js" );

autoTester.perform("zone - ambient light inheritance", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();

    // Set up test environment
    var avatarOriginPosition = MyAvatar.position;
    
    var TESTS_URL = "https://github.com/NissimHadar/hifi_tests/blob/addRecursionToAutotester/";
    var SUFFIX = "?raw=true";

    // Place object relative to the avatar (object will always be placed in the same relative position)
    var objectOrientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    var objectPosition = {x: avatarOriginPosition.x + OBJ_DX, y: avatarOriginPosition.y + OBJ_DY, z: avatarOriginPosition.z  + OBJ_DZ};

    var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
    var MODEL_SCALE = 0.75;

    var objectName = "hifi_roughnessV00_metallicV_albedoV_ao";
    var objectProperties = {
        type: "Model",
        modelURL: TESTS_URL + 'assets/models/material_matrix_models/fbx/blender/' + objectName + '.fbx' + SUFFIX,
        name: objectName,
        position: objectPosition,    
        rotation: objectOrientation,    
        dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
    };
    var object = Entities.addEntity(objectProperties);

    // Setup 3 zones
    var zone1Dimensions = { x: 10.0, y: 10.0, z: 40.0};
    var zone2Dimensions = { x:  8.0, y: 10.0, z: 20.0};
    var zone3Dimensions = { x:  4.0, y: 10.0, z: 30.0};
    
    var marker1Dimensions = { x: 10.0, y: 0.01, z: 40.0};
    var marker2Dimensions = { x:  8.0, y: 0.01, z: 20.0};
    var marker3Dimensions = { x:  4.0, y: 0.01, z: 30.0};

    var BRIGHT_SKY_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/Sky_Day-Sun-Mid-photo.ktx' + SUFFIX);
    var zone1properties = {
        type: "Zone",
        name: "Zone 1",

        position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 2.0, z: MyAvatar.position.z - 25.0},
        rotation: MyAvatar.orientation,    
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
    var zone1 = Entities.addEntity(zone1properties);

    var CLOUDY_SKY_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/ThickCloudsWater2.jpg' + SUFFIX);
    var zone2properties = {
        type: "Zone",
        name: "Zone 2",

        position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 2.0, z: MyAvatar.position.z - 25.0},
        rotation: MyAvatar.orientation,    
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
    var zone2 = Entities.addEntity(zone2properties);

    var NIGHT_SKY_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/FullMoon1024Compressed.jpg' + SUFFIX);
    var zone3properties = {
        type: "Zone",
        name: "Zone 3",

        position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 2.0, z: MyAvatar.position.z - 25.0},
        rotation: MyAvatar.orientation,    
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
    var zone3 = Entities.addEntity(zone3properties);

    // Show zone positions with rectangles
    var marker1properties = {
        type: "Box",
        name: "marker 1",
        position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 5.0, z: MyAvatar.position.z - 25.0},
        dimensions: marker1Dimensions,
        "color": {"red": 200,"green": 0,"blue": 0},
        visible: true
    };
    var marker1 = Entities.addEntity(marker1properties);

    var marker2properties = {
        type: "Box",
        name: "marker 2",
        position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 5.0 + 0.01, z: MyAvatar.position.z - 25.0},
        dimensions: marker2Dimensions,
        "color": {"red": 0,"green": 200,"blue":0},
        visible: true
    };
    var marker2 = Entities.addEntity(marker2properties);

    var marker3properties = {
        type: "Box",
        name: "marker 3",
        position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 5.0 + 0.02, z: MyAvatar.position.z - 25.0},
        dimensions: marker3Dimensions,
        "color": {"red": 0,"green": 0,"blue": 200},
        visible: true
    };
    var marker3 = Entities.addEntity(marker3properties);

    var OBJ_DX = 0.0;
    var OBJ_DY = 0.65;
    var OBJ_DZ = -2.0;

    //Add test steps, These may be called via the timing mechanism for auto-testing,  
    // or stepped through with the space bar
    autoTester.addStep("Setup camera position",
        function () {
            spectatorCameraConfig.position = {x: avatarOriginPosition.x, y: avatarOriginPosition.y + 0.6, z: avatarOriginPosition.z};
        }
    );
        
    autoTester.addStepSnapshot("Moving forward",
        function () {
            MyAvatar.position  = {x: avatarOriginPosition.x, y: avatarOriginPosition.y, z: avatarOriginPosition.z - 7.5};
            spectatorCameraConfig.position = {x: avatarOriginPosition.x, y: avatarOriginPosition.y + 0.6, z: avatarOriginPosition.z - 7.5};
            
            var newProperty = { 
                position: {x: MyAvatar.position.x + OBJ_DX, y: MyAvatar.position.y + OBJ_DY, z: MyAvatar.position.z + OBJ_DZ}
            };
            Entities.editEntity(object, newProperty);  
        }
     );
     
    autoTester.addStepSnapshot("Moving forward",     
        function () {
            MyAvatar.position  = {x: avatarOriginPosition.x, y: avatarOriginPosition.y, z: avatarOriginPosition.z - 12.5};
            spectatorCameraConfig.position = {x: avatarOriginPosition.x, y: avatarOriginPosition.y + 0.6, z: avatarOriginPosition.z - 12.5};

            var newProperty = { 
                position: {x: MyAvatar.position.x + OBJ_DX, y: MyAvatar.position.y + OBJ_DY, z: MyAvatar.position.z + OBJ_DZ}
            };
            Entities.editEntity(object, newProperty);
        }
    );
        
    autoTester.addStepSnapshot("Moving forward and right",     
        function () {
            MyAvatar.position  = {x: avatarOriginPosition.x + 3.0, y: avatarOriginPosition.y, z: avatarOriginPosition.z - 17.5};
            spectatorCameraConfig.position = {x: avatarOriginPosition.x + 3.0, y: avatarOriginPosition.y + 0.6, z: avatarOriginPosition.z - 17.5};

            var newProperty = { 
                position: {x: MyAvatar.position.x + OBJ_DX, y: MyAvatar.position.y + OBJ_DY, z: MyAvatar.position.z + OBJ_DZ}
            };
            Entities.editEntity(object, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Moving left",     
        function () {
            MyAvatar.position  = {x: avatarOriginPosition.x, y: avatarOriginPosition.y, z: avatarOriginPosition.z - 17.5};
            spectatorCameraConfig.position = {x: avatarOriginPosition.x, y: avatarOriginPosition.y + 0.6, z: avatarOriginPosition.z - 17.5};
            
            var newProperty = { 
                position: {x: MyAvatar.position.x + OBJ_DX, y: MyAvatar.position.y + OBJ_DY, z: MyAvatar.position.z + OBJ_DZ}
            };
            Entities.editEntity(object, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Take final snapshot",     
        function () {
        }
    );
        
    autoTester.addStepSnapshot("Cleanup",     
        function () {
            Entities.deleteEntity(object);
            Entities.deleteEntity(zone1);
            Entities.deleteEntity(zone2);
            Entities.deleteEntity(zone3);
            Entities.deleteEntity(marker1);
            Entities.deleteEntity(marker2);
            Entities.deleteEntity(marker3);

            module.exports.complete = true;
        }
    );
    
    var result = autoTester.runTest(testType);
});
