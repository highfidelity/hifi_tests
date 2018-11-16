LIFETIME = 120;
originPosition = nitpick.getOriginFrame();
assetsRootPath = nitpick.getAssetsRootPath();

box = 0;

var backgroundZone;

setup = function() {
    nitpick.addStep("Create a background zone", function () {
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
    
    nitpick.addStep("Prepare result box, green if passed, red if failed", function () {
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
    nitpick.addStepSnapshot("Check that box is white (testing the tester...)");
}

allPassed = function(failures) {
    var noneFailed = true;
    for (var i = 0; i < failures.length; ++i) {
        if (failures[i]) {
            noneFailed = false;
            break;
        }
    }

    return noneFailed;
}

// returns green if value is 0, else red 
resultsColour = function(failures) {
    if (allPassed(failures)) {
        return { red:   0, green: 255, blue: 0 };
    } else {
        return { red: 255, green:   0, blue: 0 };
    }
}

convertFailuresToLineNumbers = function(failures) {
    var line = "";
    for (var i = 0; i < failures.length; ++i) {
        if (failures[i]) {
            if (line !== "") {
                line = line + ', ';
            }
            line = line + (i + 1).toString();
        }
    }
    
    return line;
}

areNumbersDifferent = function(x, y) {
    return (Math.abs(x - y) > 0.0001);
}

var line
compareObjects = function(object1, object2, failures) {
    if (typeof failures === 'undefined') {
        line   = 0;
        failures = [];
    }
    
    for (var key in object1) {
        line  += 1;
        var nextObject = object1[key];
        if (typeof nextObject === 'object') {
            console.warn(line, "------ ", key, ":");
            failures.push(false); // This is to keep line numbers relevant (objects have a line number, but of course no value)
            compareObjects(nextObject, object2[key], failures);
        } else {
            var failure;
            if (typeof object1[key] === 'number') {
                failure = areNumbersDifferent(object1[key], object2[key]);
            } else {
                failure = (object1[key] !== object2[key]);
            }
            failures.push(failure); // false will be pushed for tests that have passed
            console.warn(line, ": ", key, object1[key], object2[key], failure ? "fail" : "pass");
        }
    }

    return failures;
}

showResults = function(failures) {
    Entities.editEntity(box, { color: resultsColour(failures) });
        
    if (allPassed(failures)) {
        console.warn("all tests passed");
    } else {
        console.warn("mismatch values at line(s): " + convertFailuresToLineNumbers(failures));
    }
}

teardown = function() {
    Entities.deleteEntity(backgroundZone);
    Entities.deleteEntity(box);
}