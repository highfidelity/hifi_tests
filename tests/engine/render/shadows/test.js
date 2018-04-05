var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Shadows", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();
    spectatorCameraConfig.position = { x: MyAvatar.position.x, y: MyAvatar.position.y, z: MyAvatar.position.z - 0.2 };

    var TESTS_URL = "https://github.com/" + user + repository + "blob/" + branch;
    var SUFFIX = "?raw=true";

    var pos =  MyAvatar.position;

    var terrain = Entities.addEntity({
        type: 'Box',
        name: 'Terrain',
        shape: 'Cube',
        dimensions: { x: 1000.0, y: 0.2, z: 1000.0 },
        position: { x: pos.x, y: pos.y - 3.0, z: pos.z },
        color: { "blue": 200, "green": 200, "red": 200
        }
    });

    var tower1 = Entities.addEntity({
        type: 'Box',
        name: 'Tower1',
        shape: 'Cube',
        dimensions: { x: 1.0, y: 300, z: 1.0 },
        position: { x: pos.x, y: pos.y + 142, z: pos.z - 20.0},
        color: { "blue": 0, "green": 200, "red": 200
        }
    });

    var tower2 = Entities.addEntity({
        type: 'Box',
        name: 'Tower2',
        shape: 'Cube',
        dimensions: { x: 1.0, y: 300, z: 1.0 },
        position: { x: pos.x + 4, y: pos.y + 142, z: pos.z - 20.0},
        color: { "blue": 0, "green": 200, "red": 200
        }
    });

    var SKY_URL = Script.resolvePath(TESTS_URL + 'assets/skymaps/Sky_Day-Sun-Mid-photo.ktx' + SUFFIX);
    var sky = Entities.addEntity({
        type: "Zone",
        name: "Sky",

        position: {x: MyAvatar.position.x, y: MyAvatar.position.y - 2.0, z: MyAvatar.position.z - 25.0},
        rotation: MyAvatar.orientation,    
        dimensions: { x: 10000.0, y: 600.0, z: 10000.0 },

        keyLightMode: "enabled",
        keyLight:{
            color: {"red":255, "green":255, "blue":255},
            direction: {
                x:  0.16317591071128845,
                y: -0.3420201241970062,
                z:  0.9254165291786194
            },
            intensity: 0.8,
            castShadows: false
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

	spectatorCameraConfig.position = {x: MyAvatar.position.x, y: MyAvatar.position.y + 0.6, z: MyAvatar.position.z};

    autoTester.addStep("Zone cast shadow flag is off - no shadows should be visible");
    
    autoTester.addStepSnapshot("Enable shadows in the zone", function () {
        Entities.editEntity(sky, { "keyLight": { castShadows: true } });
    });
    
    autoTester.addStepSnapshot("Set the 'Light Altitude' to 10 and 'Light Azimuth' to 30", function () {
        Entities.editEntity(sky, { keyLight: { intensity: 1.0, direction: Vec3.fromPolar(10.0 * Math.PI/180.0, 30.0 * Math.PI/180.0) } });
    });
    
    autoTester.addStepSnapshot("Remove shadow from one of the towers", function() {
        Entities.editEntity(tower1, { canCastShadow: false });
    });
    
    autoTester.addStepSnapshot("Clean up after test", function () {
        Entities.deleteEntity(sky);
        Entities.deleteEntity(terrain);
        Entities.deleteEntity(tower1);
        Entities.deleteEntity(tower2);
    });
    
    var result = autoTester.runTest(testType);
});