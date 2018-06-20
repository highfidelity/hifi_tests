Script.include("https://raw.githubusercontent.com/highfidelity/hifi_tests/RC69/tests/utils/branchUtils.js");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Zone - Ambient Light Inheritance", Script.resolvePath("."), "secondary", function(testType) {
    var avatarOriginPosition = MyAvatar.position;
    
    var zoneRedPosition   = { x: avatarOriginPosition.x, y: avatarOriginPosition.y - 4.0, z: avatarOriginPosition.z - 17.5 };
    var zoneBluePosition  = { x: avatarOriginPosition.x, y: avatarOriginPosition.y - 4.0, z: avatarOriginPosition.z - 17.5 };
    var zoneGreenPosition = { x: avatarOriginPosition.x, y: avatarOriginPosition.y - 4.0, z: avatarOriginPosition.z - 17.5 };

    var ZONE_HEIGHT = 10.0;
    var zoneRedDimensions   = { x: 40.0, y: ZONE_HEIGHT, z: 40.0};
    var zoneGreenDimensions = { x: 30.0, y: ZONE_HEIGHT, z: 30.0};
    var zoneBlueDimensions  = { x: 20.0, y: ZONE_HEIGHT, z: 20.0};

    var TESTS_URL = "https://github.com/" + user + repository + "blob/" + branch;
    var SUFFIX = "?raw=true";
    var RAW_TESTS_URL = "https://raw.githubusercontent.com/" + user + repository + branch;
    
    var zoneRed;
    var zoneGreen;
    var zoneBlue;
    var sphere;
    
    var SPHERE_OFFSET = { x: 0.0, y: 0.6, z: -2.0 };

    var LIFETIME = 60.0;
    
    // Add test steps, These may be called via the timing mechanism for auto-testing,  
    // or stepped through with the space bar
    
    autoTester.addStep("Setup zones and sphere", function () {
        // Create zones
        var BRIGHT_SKY_URL = Script.resolvePath(RAW_TESTS_URL + 'assets/skymaps/Sky_Day-Sun-Mid-photo.texmeta.json');
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

        var CLOUDY_SKY_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/ThickCloudsWater2.jpg' + SUFFIX);
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

        var NIGHT_SKY_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/FullMoon1024Compressed.jpg' + SUFFIX);
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
            position: Vec3.sum(MyAvatar.position, SPHERE_OFFSET),
            dimensions: { x: 0.4, y: 0.4, z: 0.4 },
            "color": {"red":255,"green":255,"blue":255},
            visible: true,
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        };
        sphere = Entities.addEntity(sphereProperties);
    });
    autoTester.addStepSnapshot("Red zone, bright ambient light");
    
    autoTester.addStep("Move to green zone", function () {
        var position = { x: 0.0, y: 0.0, z: -5.0 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, position);
        validationCamera_setTranslation(position);
        
        Entities.editEntity(sphere, { position: Vec3.sum(MyAvatar.position, SPHERE_OFFSET) });
    });
    autoTester.addStepSnapshot("Green zone, medium ambient light");
    
    autoTester.addStep("Move to blue zone", function () {
        var position = { x: 0.0, y: 0.0, z: -10.0 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, position);
        validationCamera_setTranslation(position);
        
        Entities.editEntity(sphere, { position: Vec3.sum(MyAvatar.position, SPHERE_OFFSET) });
    });
    autoTester.addStepSnapshot("Blue zone, dark ambient light");
    
    autoTester.addStep("Diable ambient light in blue zone", function () {
        Entities.editEntity(zoneBlue, { ambientLightMode: "disabled" });  
    });
    autoTester.addStepSnapshot("Blue off,  no ambient light");
        
    autoTester.addStep("Inherit ambient light", function () {
        Entities.editEntity(zoneBlue, { ambientLightMode: "inherit" });  
    });
    autoTester.addStepSnapshot("Blue zone, medium ambient light (from green)");
        
    autoTester.addStep("Disable green ambient light", function () {
        Entities.editEntity(zoneGreen, { ambientLightMode: "disabled" });  
    });
    autoTester.addStepSnapshot("Green off,  no ambient light");
        
    autoTester.addStep("Set green ambient light to inherit", function () {
        Entities.editEntity(zoneGreen, { ambientLightMode: "inherit" });  
    });
    autoTester.addStepSnapshot("Green inherit, bright ambient light (from red)");
        
    autoTester.addStep("Set red ambient light to off", function () {
        Entities.editEntity(zoneRed, { ambientLightMode: "disabled" });  
    });
    autoTester.addStepSnapshot("Red off,  no ambient light");
        
    autoTester.addStep("Move to green zone", function () {
        var position = { x: 0.0, y: 0.0, z: -5.0 };
        MyAvatar.position  = Vec3.sum(avatarOriginPosition, position);
        validationCamera_setTranslation(position);
        
        Entities.editEntity(sphere, { position: Vec3.sum(MyAvatar.position, SPHERE_OFFSET) });
    });
    autoTester.addStepSnapshot("Green zone, still no ambient light");
                
    autoTester.addStep("Set red ambient light to on", function () {
        Entities.editEntity(zoneRed, { ambientLightMode: "enabled" });  
    });
    autoTester.addStepSnapshot("Red on, bright ambient light");

    autoTester.addStep("Delete entities", function () {
        Entities.deleteEntity(zoneRed);
        Entities.deleteEntity(zoneGreen);
        Entities.deleteEntity(zoneBlue);
        Entities.deleteEntity(sphere);
    });
    
    var result = autoTester.runTest(testType);
});
