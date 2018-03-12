var user = "highfidelity/";
var repository = "hifi_tests/";
var branch = "master/";
var autoTester = Script.require("https://raw.githubusercontent.com/" + user + repository + branch + "tests/utils/autoTester.js");

autoTester.perform("effect - haze", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();
    
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

    // A far away "tower"
    var base = Entities.addEntity({
        type: 'Box',
        name: 'Tower base',
        shape: 'Cube',
        dimensions: { x: 10.0, y: 10, z: 10.0 },
        position: { x: pos.x, y: pos.y + 1.0, z: pos.z - 1000.0},
        color: { "blue": 200, "green": 200, "red": 0
        }
    });
    var tower = Entities.addEntity({
        type: 'Box',
        name: 'Tower',
        shape: 'Cube',
        dimensions: { x: 3.0, y: 300, z: 3.0 },
        position: { x: pos.x, y: pos.y + 150, z: pos.z - 1000.0},
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

	spectatorCameraConfig.position = {x: MyAvatar.position.x, y: MyAvatar.position.y + 0.6, z: MyAvatar.position.z};

    autoTester.addStepSnapshot("Initial state");
        
    autoTester.addStepSnapshot("Enable haze, range at 15000 - sky is not visible, tower is visible",
        function () {
            var newProperty = { 
                hazeMode: "enabled",
                haze: {
                    hazeRange: 15000.0
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Set range to 500 - tower no longer visible",
        function () {
            var newProperty = { 
                haze: {
                    hazeRange: 500.0
                }
            };
            Entities.editEntity(sky, newProperty);  

        }
    );
        
    autoTester.addStepSnapshot("Turn on altitude effect - top of tower is visible",
        function () {
            var newProperty = { 
                haze: {
                    hazeAltitudeEffect: 1
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Set ceiling to 500 - tower no longer visible",
        function () {
            var newProperty = { 
                haze: {
                    hazeCeiling: 500.0
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Set base to -200 - top of tower is visible",
        function () {
            var newProperty = { 
                haze: {
                    hazeBaseRef: -200.0
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Set base to 0 and haze colour to sandy - haze looks like a sandstorm",
        function () {
            var newProperty = { 
                haze: {
                    hazeBaseRef: 0.0,
                    hazeColor:{"red":153,"green":107,"blue":47}
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Set background blend to 0.5 - tower and sky are partially visible",
        function () {
            var newProperty = { 
                haze: {
                    hazeBackgroundBlend: 0.5
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Set background blend to 1 - sky becomes clear",
        function () {
            var newProperty = { 
                haze: {
                    hazeBackgroundBlend: 1.0
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
    
    autoTester.addStepSnapshot("Set background blend back to 0 - cannot see tower nor sky",
        function () {
            var newProperty = { 
                haze: {
                    hazeBackgroundBlend: 0.0
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
    
    autoTester.addStepSnapshot("Test glare effect (sun is 20 degrees elevation, 010 azimuth) - large burgundy sun glare effect can be seen",
        function () {
            var newProperty = {
                haze: {
                    hazeCeiling: 5000.0,
                    hazeEnableGlare: 1,
                    hazeGlareColor:{"red":176,"green":25,"blue":68},
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
    
    autoTester.addStepSnapshot("Set glare angle to 5 degrees - sun glare angle becomes smaller",
        function () {
            var newProperty = { 
                haze: {
                    hazeGlareAngle: 5
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Clean up",
        function () {
            Entities.deleteEntity(terrain);
            Entities.deleteEntity(base);
            Entities.deleteEntity(tower);
            Entities.deleteEntity(sky);
        }
    );
    
    var result = autoTester.runTest(testType);
});
