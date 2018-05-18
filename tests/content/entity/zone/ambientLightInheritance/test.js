if (typeof user === 'undefined') var user = "highfidelity/";var user = "highfidelity/";
if (typeof repository === 'undefined') var repository = "hifi_tests/";
if (typeof branch === 'undefined') var branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Zone - Ambient Light Inheritance", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();
   
    // Set up test environment
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
    
    // Create zones
    var zoneRed;
    var zoneGreen;
    var zoneBlue;
    var sphere;
    
    var DX = 0.0;
    var DY = 0.6;
    var DZ = -2.0;

    //Add test steps, These may be called via the timing mechanism for auto-testing,  
    // or stepped through with the space bar
    
    autoTester.addStep("Setup zones and sphere", function () {
        var BRIGHT_SKY_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/Sky_Day-Sun-Mid-photo.ktx' + SUFFIX);
        var zoneRedProperties = {
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
            type: "Sphere",
            name: "sphere",
            position: {x: MyAvatar.position.x + DX, y: MyAvatar.position.y + DY, z: MyAvatar.position.z + DZ},
            dimensions: { x: 0.4, y: 0.4, z: 0.4 },
            "color": {"red":255,"green":255,"blue":255},
            visible: true
        };
        sphere = Entities.addEntity(sphereProperties);
    });
    autoTester.addStepSnapshot("Red zone, bright ambient light");
    
    autoTester.addStep("Move to green zone", function () {
        MyAvatar.position  = {x: avatarOriginPosition.x, y: avatarOriginPosition.y, z: avatarOriginPosition.z - 5.0};           
        spectatorCameraConfig.position = {x: avatarOriginPosition.x , y: avatarOriginPosition.y + 0.6, z: avatarOriginPosition.z - 5.0};

        var newProperty = {position: {x: MyAvatar.position.x + DX, y: MyAvatar.position.y + DY, z: MyAvatar.position.z + DZ}};
        Entities.editEntity(sphere, newProperty);
    });
    autoTester.addStepSnapshot("Green zone, medium ambient light");
    
    autoTester.addStep("Move to blue zone", function () {
        MyAvatar.position  = {x: avatarOriginPosition.x, y: avatarOriginPosition.y, z: avatarOriginPosition.z - 10.0};           
        spectatorCameraConfig.position = {x: avatarOriginPosition.x , y: avatarOriginPosition.y + 0.6, z: avatarOriginPosition.z - 10.0};

        var newProperty = {position: {x: MyAvatar.position.x + DX, y: MyAvatar.position.y + DY, z: MyAvatar.position.z + DZ}};
        Entities.editEntity(sphere, newProperty);  
    });
    autoTester.addStepSnapshot("Blue zone, dark ambient light");
    
    autoTester.addStep("Diable ambient light in blue zone", function () {
        var newProperty = {ambientLightMode: "disabled"};
        Entities.editEntity(zoneBlue, newProperty);  
    });
    autoTester.addStepSnapshot("Blue off,  no ambient light");
        
    autoTester.addStep("Inherit ambient light",
        function () {
            var newProperty = {ambientLightMode: "inherit"};
            Entities.editEntity(zoneBlue, newProperty);  
        }
    );
    autoTester.addStepSnapshot("Blue zone, medium ambient light (from green)");
        
    autoTester.addStep("Disable green ambient light", function () {
        var newProperty = {ambientLightMode: "disabled"};
        Entities.editEntity(zoneGreen, newProperty);  
    });
    autoTester.addStepSnapshot("Green off,  no ambient light");
        
    autoTester.addStep("Set green ambient light to inherit", function () {
        var newProperty = {ambientLightMode: "inherit"};
        Entities.editEntity(zoneGreen, newProperty);  
    });
    autoTester.addStepSnapshot("Green inherit, bright ambient light (from red)");
        
    autoTester.addStep("Set red ambient light to off", function () {
        var newProperty = {ambientLightMode: "disabled"};
            Entities.editEntity(zoneRed, newProperty);  
    });
    autoTester.addStepSnapshot("Red off,  no ambient light");
        
    autoTester.addStep("Move to green zone", function () {
        MyAvatar.position  = {x: avatarOriginPosition.x, y: avatarOriginPosition.y, z: avatarOriginPosition.z - 5.0};           
        spectatorCameraConfig.position = {x: avatarOriginPosition.x , y: avatarOriginPosition.y + 0.6, z: avatarOriginPosition.z - 5.0};

        var newProperty = {position: {x: MyAvatar.position.x + DX, y: MyAvatar.position.y + DY, z: MyAvatar.position.z + DZ}};
        Entities.editEntity(sphere, newProperty);  
    });
    autoTester.addStepSnapshot("Green zone, still no ambient light");
                
    autoTester.addStep("Set red ambient light to on", function () {
        var newProperty = {ambientLightMode: "enabled"};
        Entities.editEntity(zoneRed, newProperty);  
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
