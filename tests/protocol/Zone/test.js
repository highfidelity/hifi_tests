if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Protocol sanity", Script.resolvePath("."), "secondary", function(testType) {
    Script.include(../common.js);
    setup();
    var zone;
     
    // returns green if value is 0, else red 
    resultsColour = function(value) {
        if (value == 0) {
            return { red:   0, green: 255, blue: 0 };
        } else {
            return { red: 255, green:   0, blue: 0 };
        }
    }
  
    // compares 2 floats with 4 digit accuracy
    fEqual= function(x, y) {
        return (Math.abs(x - y) < 0.0001);
    }
    
    convertResultToLines = function(result) {
        intResult = Math.floor(result); // just to be safe
        var line = "";
        var i = 1;
        while (intResult > 0) {
            if (intResult % 2) {
                if (line !== "") {
                    line = line + ', ';
                }
                line = line + i.toString();
                intResult -= 1;
            }
            
            intResult /= 2;
            i += 1;
        }
        
        return line;
    }

    autoTester.addStep("Create a background zone", function () {
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "background",
            position: originPosition,
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0 ),
            
            dimensions: { x: 2000.0, y: 2000.0, z: 2000.0 },

            keyLightMode: "enabled",
            keyLight:{
                color: { "red": 255, "green": 255, "blue": 255 },
                intensity: 0.8,
                direction: {
                    "x": 0.0,
                    "y": -0.70710678118,
                    "z": -0.70710678118
                }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { red: 255, green: 255, blue: 255 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            }
        };
        backgroundZone = Entities.addEntity(zoneProperties);
    });
    
    autoTester.addStep("Prepare result box, green if passed, red if failed", function () {
        var boxProperties = {
            type: "Box",
            name: "box",
            lifetime: LIFETIME,
            color: { red: 255, green: 255, blue: 255 },
            position: Vec3.sum(originPosition, { x: 0.0, y: 1.7, z: -2.0 }),
            dimensions: { x: 1.0, y: 1.0, z: 1.0 },
            userData: JSON.stringify({ grabbableKey: { grabbable: false } })
        };
        box = Entities.addEntity(boxProperties);
    });
    autoTester.addStepSnapshot("Check that box is white (testing the tester...)");
  
    autoTester.addStep("Create a zone", function () {
        var zoneProperties = {
            lifetime: LIFETIME,
            type: "Zone",
            name: "Kih85Rfg",
            position: Vec3.sum(originPosition, { x: 0.0, y: 1.6, z: 3000 }),
            rotation: Quat.fromPitchYawRollDegrees(1.0, 7.0, 43.0 ),
            
            dimensions: { x: 20.0, y: 3.0, z: 9.75 },

            keyLightMode: "enabled",
            keyLight:{
                color: { "red": 34, "green": 73, "blue": 88 },
                intensity: 0.125,
                direction: {
                    "x": 0.0,
                    "y": 1.0,
                    "z": 0.0
                }
            },

            skyboxMode: "enabled",
            skybox: {
                color: { red: 12, green: 93, blue: 233 },
                url: assetsRootPath + 'skymaps/YellowCube.jpg'
            },
                        
            ambientLightMode: "disabled",
            ambientLight: {
                ambientURL: assetsRootPath + 'skymaps/Sky_Day-Sun-Mid-photo.texmeta.json'
            },
            
            hazeMode: 'enabled',
            haze: {
                hazeRange: 502.5,
                hazeColor: { red: 153, green: 107, blue: 47 },
                hazeGlareColor: { red: 53, green: 64, blue: 128 },
                hazeEnableGlare: true,
                hazeGlareAngle: 64.5,
                hazeAltitudeEffect: true,
                hazeCeiling: 5432.0,
                hazeBaseRef: 1423.0,
                hazeBackgroundBlend: 0.375,
                hazeAttenuateKeyLight: false,
                hazeKeyLightRange: 1000.0,
                hazeKeyLightAltitude: 2343.0
            },

            bloomMode: "disabled",
            bloom: {
                bloomIntensity: 1.0,
                bloomThreshold: 0.875
            },

            isVisible: false
        };
        zone = Entities.addEntity(zoneProperties);
    });
    
    autoTester.addStep("Test zone", function () {
        var properties = Entities.getEntityProperties(zone);
        var result = 0;
        var i = 1;
        
        result += (properties.lifetime == LIFETIME) ? 0 : i; i *= 2;
        result += (properties.name == "Kih85Rfg") ? 0 : i; i *= 2;
        result += (properties.type == "Zone") ? 0 : i; i *= 2;

        result += fEqual(properties.position.x, originPosition.x) ? 0 : i; i *= 2;
        result += fEqual(properties.position.y, originPosition.y + 1.6) ? 0 : i; i *= 2;
        result += fEqual(properties.position.z, originPosition.z + 3000) ? 0 : i; i *= 2;

        result += fEqual(properties.rotation.x, -0.014328241348266602) ? 0 : i; i *= 2;
        result += fEqual(properties.rotation.y,  0.059983253479003906) ? 0 : i; i *= 2;
        result += fEqual(properties.rotation.z,  0.3652857542037964) ? 0 : i; i *= 2;
        result += fEqual(properties.rotation.w,  0.928831934928894) ? 0 : i; i *= 2;

        result += (properties.dimensions.x == 20.0) ? 0 : i; i *= 2;
        result += (properties.dimensions.y == 3.0) ? 0 : i; i *= 2;
        result += (properties.dimensions.z ==  9.75) ? 0 : i; i *= 2;

        result += (properties.keyLightMode == "enabled") ? 0 : i; i *= 2;
        result += (properties.keyLight.color.red   == 34) ? 0 : i; i *= 2;
        result += (properties.keyLight.color.green == 73) ? 0 : i; i *= 2;
        result += (properties.keyLight.color.blue  == 88) ? 0 : i; i *= 2;
        result += (properties.keyLight.intensity, 0.125) ? 0 : i; i *= 2;
        result += (properties.keyLight.direction.x == 0.0) ? 0 : i; i *= 2;
        result += (properties.keyLight.direction.y == 1.0) ? 0 : i; i *= 2;
        result += (properties.keyLight.direction.z == 0.0) ? 0 : i; i *= 2;    

        result += (properties.skyboxMode == "enabled") ? 0 : i; i *= 2;
        result += (properties.skybox.color.red   == 12) ? 0 : i; i *= 2;
        result += (properties.skybox.color.green == 93) ? 0 : i; i *= 2;
        result += (properties.skybox.color.blue  == 233) ? 0 : i; i *= 2; 
        
        result += (properties.skybox.url == assetsRootPath + 'skymaps/YellowCube.jpg') 
           ? 0 : i; i *= 2; 

        result += (properties.ambientLightMode == "disabled") ? 0 : i; i *= 2;
        result += (properties.ambientLight.ambientURL == assetsRootPath + 'skymaps/Sky_Day-Sun-Mid-photo.texmeta.json') 
           ? 0 : i; i *= 2; 
       
        result += (properties.hazeMode == "enabled") ? 0 : i; i *= 2;
        result += (properties.haze.hazeRange == 502.5) ? 0 : i; i *= 2;
        result += (properties.haze.hazeColor.red   == 153) ? 0 : i; i *= 2;
        result += (properties.haze.hazeColor.green == 107) ? 0 : i; i *= 2;
        result += (properties.haze.hazeColor.blue  == 47) ? 0 : i; i *= 2;
        result += (properties.haze.hazeGlareColor.red   == 53) ? 0 : i; i *= 2;
        result += (properties.haze.hazeGlareColor.green == 64) ? 0 : i; i *= 2;
        result += (properties.haze.hazeGlareColor.blue  == 128) ? 0 : i; i *= 2;
        result += (properties.haze.hazeEnableGlare == true) ? 0 : i; i *= 2;
        result += (properties.haze.hazeGlareAngle == 64.5) ? 0 : i; i *= 2;
        result += (properties.haze.hazeAltitudeEffect == true) ? 0 : i; i *= 2;
        result += (properties.haze.hazeCeiling == 5432.0) ? 0 : i; i *= 2;
        result += (properties.haze.hazeBaseRef == 1423.0) ? 0 : i; i *= 2;
        result += (properties.haze.hazeBackgroundBlend == 0.375) ? 0 : i; i *= 2;
        result += (properties.haze.hazeAttenuateKeyLight == false) ? 0 : i; i *= 2;
        result += (properties.haze.hazeKeyLightRange == 1000.0) ? 0 : i; i *= 2;
        result += (properties.haze.hazeKeyLightAltitude == 2343.0) ? 0 : i; i *= 2;
        
        result += (properties.bloomMode == "disabled") ? 0 : i; i *= 2;
        result += (properties.bloom.bloomIntensity == 1.0) ? 0 : i; i *= 2;
        result += (properties.bloom.bloomThreshold == 0.875) ? 0 : i; i *= 2;
        
        Entities.editEntity(box, { color: resultsColour(result) });
        
        if (result != 0) {
            console.warn("mismatch values at line(s): " + convertResultToLines(result));
        }
    });
    
    autoTester.addStep("Clean up after test", function () {
        teardown();
        Entities.deleteEntity(zone);
    });
    
    var result = autoTester.runTest(testType);
});
