if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("Zone - Ambient Light Inheritance", Script.resolvePath("."), "secondary", function(testType) {
    var avatarOriginPosition = nitpick.getOriginFrame();
    avatarOriginPosition = Vec3.sum(avatarOriginPosition, { x: 0.0, y: 1.0, z: 0.0 });
    
    var zoneRedPosition   = { x: avatarOriginPosition.x, y: avatarOriginPosition.y - 4.0, z: avatarOriginPosition.z - 17.5 };
    var zoneBluePosition  = { x: avatarOriginPosition.x, y: avatarOriginPosition.y - 4.0, z: avatarOriginPosition.z - 17.5 };
    var zoneGreenPosition = { x: avatarOriginPosition.x, y: avatarOriginPosition.y - 4.0, z: avatarOriginPosition.z - 17.5 };

    var ZONE_HEIGHT = 10.0;
    var zoneRedDimensions   = { x: 40.0, y: ZONE_HEIGHT, z: 40.0};
    var zoneGreenDimensions = { x: 30.0, y: ZONE_HEIGHT, z: 30.0};
    var zoneBlueDimensions  = { x: 20.0, y: ZONE_HEIGHT, z: 20.0};

    var assetsRootPath = nitpick.getAssetsRootPath();
    var zoneRed;
    var zoneGreen;
    var zoneBlue;
    var sphere;
    
    var SPHERE_OFFSET = { x: 0.0, y: 0.6, z: -2.0 };

    var LIFETIME = 60.0;

    // Add test steps, These may be called via the timing mechanism for auto-testing,  
    // or stepped through with the space bar
    
    nitpick.addStep("Setup zones and sphere", function () {
        // Create zones
        var BRIGHT_SKY_URL = assetsRootPath + 'skymaps/Sky_Day-Sun-Mid-photo.texmeta.json';
        var zoneRedProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone red",
            position: zoneRedPosition,
            dimensions: zoneRedDimensions,
            
            keyLightMode: "disabled",
            
            ambientLightMode: "enabled",
            ambientLight: {
                ambientURL: BRIGHT_SKY_URL
            }
        };
        zoneRed = Entities.addEntity(zoneRedProperties);

        var CLOUDY_SKY_URL = assetsRootPath + 'skymaps/ThickCloudsWater2.jpg';
        var zoneGreenProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone green",
            position: zoneGreenPosition,
            dimensions: zoneGreenDimensions,
            
            keyLightMode: "disabled",
            
            ambientLightMode: "enabled",
            ambientLight: {
                ambientURL: CLOUDY_SKY_URL
            }
        };
        zoneGreen = Entities.addEntity(zoneGreenProperties);

        var NIGHT_SKY_URL = assetsRootPath + 'skymaps/FullMoon1024Compressed.jpg';
        var zoneBlueProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "zone blue",
            position: zoneBluePosition,
            dimensions: zoneBlueDimensions,
            
            keyLightMode: "disabled",
            
            ambientLightMode: "enabled",
            ambientLight: {
                ambientURL: NIGHT_SKY_URL
            }
        };
        zoneBlue = Entities.addEntity(zoneBlueProperties);

        // Add a white sphere
        var sphereProperties = {
            lifetime: LIFETIME,
            type: "Sphere",
            name: "sphere",
            position: Vec3.sum(avatarOriginPosition, SPHERE_OFFSET),
            dimensions: { x: 0.4, y: 0.4, z: 0.4 },
            color: { red:255, green: 255, blue: 255 },
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false }})
        };
        sphere = Entities.addEntity(sphereProperties);
    });
    nitpick.addStepSnapshot("Red zone, bright ambient light");

    nitpick.addStep("Move to green zone", function () {
        var position = { x: 0.0, y: 0.0, z: -5.0 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, position);
        validationCamera_setTranslation(position);
        
        Entities.editEntity(sphere, { position: Vec3.sum(MyAvatar.position, SPHERE_OFFSET) });
    });
    nitpick.addStepSnapshot("Green zone, medium ambient light");

    nitpick.addStep("Move to blue zone", function () {
        var position = { x: 0.0, y: 0.0, z: -10.0 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, position);
        validationCamera_setTranslation(position);

        Entities.editEntity(sphere, { position: Vec3.sum(MyAvatar.position, SPHERE_OFFSET) });
    });
    nitpick.addStepSnapshot("Blue zone, dark ambient light");

    nitpick.addStep("Diable ambient light in blue zone", function () {
        Entities.editEntity(zoneBlue, { ambientLightMode: "disabled" });  
    });
    nitpick.addStepSnapshot("Blue off,  no ambient light");

    nitpick.addStep("Inherit ambient light", function () {
        Entities.editEntity(zoneBlue, { ambientLightMode: "inherit" });  
    });
    nitpick.addStepSnapshot("Blue zone, medium ambient light (from green)");

    nitpick.addStep("Disable green ambient light", function () {
        Entities.editEntity(zoneGreen, { ambientLightMode: "disabled" });  
    });
    nitpick.addStepSnapshot("Green off,  no ambient light");

    nitpick.addStep("Set green ambient light to inherit", function () {
        Entities.editEntity(zoneGreen, { ambientLightMode: "inherit" });  
    });
    nitpick.addStepSnapshot("Green inherit, bright ambient light (from red)");

    nitpick.addStep("Set red ambient light to off", function () {
        Entities.editEntity(zoneRed, { ambientLightMode: "disabled" });  
    });
    nitpick.addStepSnapshot("Red off,  no ambient light");

    nitpick.addStep("Move to green zone", function () {
        var position = { x: 0.0, y: 0.0, z: -5.0 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, position);
        validationCamera_setTranslation(position);

        Entities.editEntity(sphere, { position: Vec3.sum(MyAvatar.position, SPHERE_OFFSET) });
    });
    nitpick.addStepSnapshot("Green zone, still no ambient light");

    nitpick.addStep("Set red ambient light to on", function () {
        Entities.editEntity(zoneRed, { ambientLightMode: "enabled" });  
    });
    nitpick.addStepSnapshot("Red on, bright ambient light");

    nitpick.addStep("Delete entities", function () {
        Entities.deleteEntity(zoneRed);
        Entities.deleteEntity(zoneGreen);
        Entities.deleteEntity(zoneBlue);
        Entities.deleteEntity(sphere);
    });

    var result = nitpick.runTest(testType);
});
