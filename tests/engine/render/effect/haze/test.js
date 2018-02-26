//var autoTester = Script.require("https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/autoTester.js" );
var autoTester = Script.require("../../../../utils/autoTester.js" );

autoTester.perform("effect - haze", Script.resolvePath("."), function(testType) {
    var spectatorCameraConfig = autoTester.setupTest();
    
    // Load terrain
    var position =  MyAvatar.position;
    position.x = position.x - 5000.0;
    position.y = position.y + 20.0;
    
    var TESTS_URL = "https://github.com/NissimHadar/hifi_tests/blob/hazeTests/";
    var SUFFIX = "?raw=true";

    var TERRAIN_URL = Script.resolvePath(TESTS_URL + '/assets/models/geometry/terrain/Nevada-Moon-Rocks.baked.fbx' + SUFFIX);
    var terrain = Entities.addEntity({
        type: 'Model',
        name: 'Terrain',
        modelURL: TERRAIN_URL,
        shapeType: 'box',
        dimensions: { x: 10000.0, y: 600.0, z: 10000.0 },
        position: position
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
                "x":  0.037007175385951996,
                "y": -0.7071067690849304,
                "z": -0.7061376571655273
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
    
    // Look down X axis
    MyAvatar.bodyYaw = 90.0;
    MyAvatar.headYaw = 90.0;
    spectatorCameraConfig.orientation = { x: 0.0, y: 0.7071, z: 0.0, w: 0.7071 };

    autoTester.addStepSnapshot("Inital state");
        
    autoTester.addStepSnapshot("Enable haze, range at 15000",
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
        
    autoTester.addStepSnapshot("Set range to 8000",
        function () {
            var newProperty = { 
                haze: {
                    hazeRange: 8000.0
                }
            };
            Entities.editEntity(sky, newProperty);  

        }
    );
        
    autoTester.addStepSnapshot("Turn on altitude effect",
        function () {
            var newProperty = { 
                haze: {
                    hazeAltitudeEffect: 1
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Set ceiling to 500",
        function () {
            var newProperty = { 
                haze: {
                    hazeCeiling: 500.0
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Set base to -400",
        function () {
            var newProperty = { 
                haze: {
                    hazeBaseRef: -400.0
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
        
    autoTester.addStepSnapshot("Set base to 0 and colour sandy",
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
        
    autoTester.addStepSnapshot("Set background blend to 1",
        function () {
            var newProperty = { 
                haze: {
                    hazeBackgroundBlend: 1.0
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
    
    autoTester.addStepSnapshot("Set background blend back to 0",
        function () {
            var newProperty = { 
                haze: {
                    hazeBackgroundBlend: 0.0
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
    
    autoTester.addStepSnapshot("Test glare effect (sun is 15 degrees elevation, 095 azimuth)",
        function () {
            var newProperty = {
                keyLight: {
                    direction:{"x":0.9622501869, "y":-0.2588190451, "z":-0.08418598283}
                },
                haze: {
                    hazeCeiling: 5000.0,
                    hazeEnableGlare: 1,
                    hazeGlareColor:{"red":176,"green":25,"blue":68},
                }
            };
            Entities.editEntity(sky, newProperty);  
        }
    );
    
    autoTester.addStepSnapshot("Set glare angle to 5 degrees",
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
            Entities.deleteEntity(sky);
            
            module.exports.complete = true;
        }
    );
    
    var result = autoTester.runTest(testType);
});
