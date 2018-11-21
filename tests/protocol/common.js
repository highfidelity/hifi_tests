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

setCommonEntityProperties = function() {
    var entityProperties = {};
    
    entityProperties.name = "Name of entity";
    entityProperties.clientOnly = false;
    entityProperties.owningAvatarID = "{87654321-1234-6666-4444-123412349876}";
    entityProperties.lifetime = 278;  
    entityProperties.locked = true;
    entityProperties.visible = false;
    entityProperties.canCastShadow = false;
    entityProperties.position = { x: 1.2, y: 3.4, z: 5.6 };
    entityProperties.rotation = Quat.fromPitchYawRollDegrees(1.2, 34.0, 154.0);
    entityProperties.dynamic = false;
    entityProperties.registrationPoint = { x: 0.2, y: 0.4, z: 0.0444 };
    entityProperties.velocity = { x: 0, y: 0, z: 0 };
    entityProperties.damping = 0.4329;
    entityProperties.angularVelocity = { x: 0.0, y: 0.0, z: 0.0 };
    entityProperties.angularDamping = 0.3938899;
    entityProperties.gravity = { x: 1.0, y: 2.0, z: 23.0 };
    entityProperties.acceleration = { x: 0.0, y: 0.0, z: 0.0 };
    entityProperties.restitution = 0.4;
    entityProperties.friction = 4.3;
    entityProperties.density = 400;
    entityProperties.collisionless = true;
    entityProperties.ignoreForCollisions = true;
    entityProperties.collisionMask = 7;
    entityProperties.collidesWith = "static,dynamic,kinematic,";
    entityProperties.collisionSoundURL = "collisionSoundURL";
    entityProperties.collisionsWillMove = false;
    entityProperties.href = "";
    entityProperties.description = "description";
    entityProperties.userData = "{ \"latitude\": 47.0, \"longitude\": 122.0, \"year\": 2018, \"month\": 6, \"day\": 13, \"hour\": 20, \"minute\": 0 }";
    entityProperties.script = "scriptURL";
    entityProperties.scriptTimestamp = 7;
    entityProperties.serverScripts = "serverScriptsURL";
    entityProperties.parentJointIndex = 32767;
    entityProperties.cloneable = false;
    entityProperties.cloneLifetime = 200;
    entityProperties.cloneLimit = 1;
    entityProperties.cloneDynamic = true;
    entityProperties.cloneAvatarEntity = false;
    entityProperties.cloneOriginID = "{12345678-4321-5555-7777-123412349876}";
    entityProperties.itemName = "item name";
    entityProperties.itemDescription = "item description";
    entityProperties.itemCategories = "item categories";
    entityProperties.itemArtist = "item artist";
    entityProperties.itemLicense = "item license";
    entityProperties.limitedRun = 123456;
    entityProperties.editionNumber = 876;
    entityProperties.entityInstanceNumber = 345;
    entityProperties.marketplaceID = "market place ID";
    entityProperties.staticCertificateVersion = 2;
    
    return entityProperties;
}