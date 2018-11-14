LIFETIME = 120;
originPosition = autoTester.getOriginFrame();
assetsRootPath = autoTester.getAssetsRootPath();

box = 0;

var backgroundZone;

setup = function() {
    // returns green if value is 0, else red 
    resultsColour = function(value) {
        if (value == 0) {
            return { red:   0, green: 255, blue: 0 };
        } else {
            return { red: 255, green:   0, blue: 0 };
        }
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
}

compareFloats = function(x, y) {
    return (Math.abs(x - y) < 0.0001);
}

compareObjects = function(object1, object2, result, index) {
    if (typeof result === 'undefined') result = 0;
    if (typeof index  === 'undefined') index  = 1;
    
    for (var key in object1) {
        var nextObject = object1[key];
        if (typeof nextObject === 'object') {
            compareObjects(nextObject, object2[key], result, index);
        } else {
            if (typeof object1[key] === 'number') {
                result += compareFloats(object1[key], object2[key]) ? 0 : index;
                console.warn(key, object1[key], object2[key], compareFloats(object1[key], object2[key]));
            } else {
                result += (object1[key] == object2[key]) ? 0 : index;
                console.warn(key, object1[key], object2[key], (object1[key] == object2[key]));
            }
            index *= 2;
        }
    }

    return result;
}

showResults = function(result) {
    Entities.editEntity(box, { color: resultsColour(result) });
        
    if (result != 0) {
        console.warn("mismatch values at line(s): " + convertResultToLines(result));
    }
}

teardown = function() {
    Entities.deleteEntity(backgroundZone);
    Entities.deleteEntity(box);
}