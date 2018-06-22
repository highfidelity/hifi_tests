Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Zone - effects of orientation", Script.resolvePath("."), "secondary", function(testType) {
    var avatarOriginPosition = MyAvatar.position;

    var zonePosition = { x: avatarOriginPosition.x, y: avatarOriginPosition.y - 4.0, z: avatarOriginPosition.z - 17.5 };
    var zoneDimensions = { x: 200.0, y: 200.0, z: 200.0};

    var assetsRootPath = autoTester.getAssetsRootPath();

    var LIFETIME = 60.0;

    // Create zones
    var SKYBOX_URL = assetsRootPath + 'skymaps/ColourBoxWithSun.jpg';
    var zoneProperties = {
        lifetime: LIFETIME,
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
        lifetime: LIFETIME,
        type: "Sphere",
        name: "sphere",
        position: {x: MyAvatar.position.x + SPHERE_DX, y: MyAvatar.position.y + SPHERE_DY, z: MyAvatar.position.z + SPHERE_DZ},
        dimensions: { x: 0.7, y: 0.7, z: 0.7 },
        color: {"red": 255,"green": 255,"blue": 255},
        visible: true,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
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
        lifetime: LIFETIME,
        type: "Model",
        modelURL: assetsRootPath + 'models/material_matrix_models/fbx/blender/' + objectName + '.fbx',
        name: objectName,
        position: objectPosition,    
        rotation: objectOrientation,    
        dimensions: Vec3.multiply(MODEL_SCALE, MODEL_DIMS),
        visible: false,
        userData: JSON.stringify({ grabbableKey: { grabbable: false } })
    };
    var object = Entities.addEntity(objectProperties);

    // Note that the image for the current step is snapped at the beginning of the next step.
    // This is because it may take a while for the image to stabilize.
    var STEP_TIME = 2000;

    // An array of tests is created.  These may be called via the timing mechanism for auto-testing,
    // or stepped through with the space bar
    autoTester.addStepSnapshot("Zone not rotated - keylight at zenith");

    // Keylight tests (keylight is straight up)
    autoTester.addStep("Pitch zone 45 degrees up", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(45.0, 0.0, 0.0)});  
    });
    autoTester.addStepSnapshot("Light should come from behind, 45 degrees above horizon");

    autoTester.addStep("Add yaw zone 90 degrees clockwise", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(45.0, -90.0, 0.0)});  
    });
    autoTester.addStepSnapshot(":ight should come from left, 45 degrees above horizon");

    autoTester.addStep("Add roll zone 45 degrees clockwise", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(45.0, -90.0, 45.0 )});  
    });
    autoTester.addStepSnapshot("Light should come from left");

    // Skybox tests
    autoTester.addStep("Clear zone rotation", function () {
        Entities.editEntity(sphere, {visible: false });  
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0 )});  
        Entities.editEntity(zone, {keyLightMode: "disabled", skyboxMode: "enabled"});  
    });
    autoTester.addStepSnapshot("Sun straight ahead on purple background (sphere is hidden)");

    autoTester.addStep("Yaw zone 15 degrees right", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, -15.0, 0.0)});  
    });
    autoTester.addStepSnapshot("Sun should move right");

    autoTester.addStep("Pitch zone 15 degrees up and yaw zone 15 degrees right", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(15.0, -15.0, 0.0)});  
    });
    autoTester.addStepSnapshot("Sun should move right and up");

    autoTester.addStep("Pitch zone 15 degrees up, yaw zone 15 degrees right and roll 45 degrees", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(15.0, -15.0, 45.0)});  
    });
    autoTester.addStepSnapshot("Sun should move straight up");
        
    // Ambient light tests
    autoTester.addStep("Zone not rotated", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0)});  

        // Add metallic object and show sphere
        Entities.editEntity(sphere, {visible: true });
        Entities.editEntity(object, {visible: true });  

        Entities.editEntity(zone, {ambientLightMode: "enabled"});  
    });
    autoTester.addStepSnapshot("Diffuse sphere and metallic object visible (skybox still enabled as a visual aid)");

    autoTester.addStep("Yaw to 90 degrees", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 90.0, 0.0)});  
    });
    autoTester.addStepSnapshot("Blue is now behind");

    autoTester.addStep("Yaw to 180 degrees", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 180.0, 0.0)});  
    });
    autoTester.addStepSnapshot("Purple is now behind");

    autoTester.addStep("Yaw to 270 degrees", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 270.0, 0.0)});  
    });
    autoTester.addStepSnapshot("Red is now behind");

    autoTester.addStep("Pitch 90", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(90.0, 0.0, 0.0)});  
    });
    autoTester.addStepSnapshot("Green is now behind");

    autoTester.addStep("Roll 45 degrees", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 45.0)});  
    });
    autoTester.addStepSnapshot("Green top-left, red top-right, yellow bottom-right, blue bottom-left");

    autoTester.addStep("Cleanup", function () {
        Entities.editEntity(zone, {rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0)});  
        Entities.deleteEntity(zone);
        Entities.deleteEntity(sphere);
        Entities.deleteEntity(object);
    });

    var result = autoTester.runTest(testType);
});
