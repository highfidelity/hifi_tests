var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("zone - ambient light inheritance", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();
   
    // Set up test environment
    var avatarOriginPosition = MyAvatar.position;
    
    var zonePosition = { x: avatarOriginPosition.x, y: avatarOriginPosition.y - 4.0, z: avatarOriginPosition.z - 17.5 };
    var zoneDimensions = { x: 200.0, y: 200.0, z: 200.0};
    
    var TESTS_URL = "https://github.com/" + user + repository + "blob/" + branch;
    var SUFFIX = "?raw=true";

    // Create zones
    var SKYBOX_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/ColourBoxWithSun.jpg' + SUFFIX);
    var zoneProperties = {
        type: "Zone",
        name: "zone",
        position: zonePosition,
        dimensions: zoneDimensions,
        
        keyLightMode: "enabled",
        keyLight:{
            "color": {"red":255,"green":0,"blue":0},
            "direction": {
                "x":  0.0,
                "y": -1.0,
                "z":  0.0
            },
            "intensity": 1.0
        },

        skyboxMode: "disabled",
        skybox: {
            color: {"red": 255,"green": 255,"blue": 255},
            url: SKYBOX_URL
        },
                
        ambientLightMode: "disabled",
        ambientLight: {
            ambientURL: SKYBOX_URL
        },
        
        hazeMode: "disabled"
    };
    var zone = Entities.addEntity(zoneProperties);
    
    // Add a sphere
    var SPHERE_DX = 0.5;
    var SPHERE_DY = 0.6;
    var SPHERE_DZ = -2.0;
    var sphereProperties = {
        type: "Sphere",
        name: "sphere",
        position: {x: MyAvatar.position.x + SPHERE_DX, y: MyAvatar.position.y + SPHERE_DY, z: MyAvatar.position.z + SPHERE_DZ},
        dimensions: { x: 0.7, y: 0.7, z: 0.7 },
        color: {"red": 255,"green": 255,"blue": 255},
        visible: true
    };
    var sphere = Entities.addEntity(sphereProperties);
    
    var OBJECT_DX = -0.5;
    var OBJECT_DY = 0.65;
    var OBJECT_DZ = -2.0;
    var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
    var MODEL_SCALE = 0.75;
    var objectOrientation = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    var objectPosition = {x: MyAvatar.position.x + OBJECT_DX, y: MyAvatar.position.y + OBJECT_DY, z: MyAvatar.position.z  + OBJECT_DZ};
    var objectName = "hifi_roughnessV00_metallicV_albedoV_ao";
    var objectProperties = {
        type: "Model",
        modelURL: TESTS_URL + 'assets/models/material_matrix_models/fbx/blender/' + objectName + '.fbx' + SUFFIX,
        name: objectName,
        position: objectPosition,    
        rotation: objectOrientation,    
        dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
        visible: false
    };
    var object = Entities.addEntity(objectProperties);
    
    // Note that the image for the current step is snapped at the beginning of the next step.
    // This is because it may take a while for the image to stabilize.
    var STEP_TIME = 2000;
    
    // An array of tests is created.  These may be called via the timing mechanism for auto-testing,
    // or stepped through with the space bar
    autoTester.addStep("Zone not rotated - keylight at zenith");
        
    // Keylight tests (keylight is straight up)
    autoTester.addStepSnapshot("Pitch zone 45 degrees up, light should come from behind, 45 degrees above horizon",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(45.0, 0.0, 0.0)});  
        }
    );
        
    autoTester.addStepSnapshot("Add yaw zone 90 degrees clockwise, light should come from left, 45 degrees above horizon",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(45.0, -90.0, 0.0)});  
        }
    );
                
    autoTester.addStepSnapshot("Add roll zone 45 degrees clockwise, light should come from left",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(45.0, -90.0, 45.0 )});  
        }
    );

    // Skybox tests
    autoTester.addStepSnapshot("Zone not rotated - sun straight ahead on purple background (sphere is hidden)",
        function () {
            Entities.editEntity(sphere, {visible: false });  
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0 )});  
            Entities.editEntity(zone, {keyLightMode: "disabled", skyboxMode: "enabled"});  
        }
    );

    autoTester.addStepSnapshot("Yaw zone 15 degrees right, sun should move right",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, -15.0, 0.0)});  
        }
    );

    autoTester.addStepSnapshot("Pitch zone 15 degrees up, yaw zone 15 degrees right, sun should move right and up",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(15.0, -15.0, 0.0)});  
        }
    );

    autoTester.addStepSnapshot("Pitch zone 15 degrees up, yaw zone 15 degrees right and roll 45 degrees, sun should move straight up",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(15.0, -15.0, 45.0)});  
        }
    );
        
    // Ambient light tests
    autoTester.addStepSnapshot("Zone not rotated - diffuse sphere and metallic object visible (skybox still enabled as a visual aid)",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0)});  
            
            // Add metallic object and show sphere
            Entities.editEntity(sphere, {visible: true });
            Entities.editEntity(object, {visible: true });  

            Entities.editEntity(zone, {ambientLightMode: "enabled"});  
        }
    );
        
    autoTester.addStepSnapshot("Yaw 90 degrees - blue is now behind",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 90.0, 0.0)});  
        }
    );
        
    autoTester.addStepSnapshot("Yaw 180 degrees - purple is now behind",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 180.0, 0.0)});  
        }
    );
        
    autoTester.addStepSnapshot("Yaw 270 degrees - red is now behind",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 270.0, 0.0)});  
        }
    );
        
    autoTester.addStepSnapshot("Pitch 90 - green is now behind",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(90.0, 0.0, 0.0)});  
        }
    );
        
    autoTester.addStepSnapshot("Roll 45 degrees - green top-left, red top-right, yellow bottom-right, blue bottom-left",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 45.0)});  
        }
    );
        
    autoTester.addStepSnapshot("Cleanup",
        function () {
            Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0)});  
            Entities.deleteEntity(zone);
            Entities.deleteEntity(sphere);
            Entities.deleteEntity(object);
        }
    );
    
    var result = autoTester.runTest(testType);
});
