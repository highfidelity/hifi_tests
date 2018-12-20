LIFETIME = 120;
originPosition = nitpick.getOriginFrame();
assetsRootPath = nitpick.getAssetsRootPath();

results = {};

allPassed = function(failures) {
    for (var i = 0; i < failures.length; ++i) {
        if (failures[i]) {
            return false;
        }
    }

    return true;
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
    if (typeof x === 'undefined' || typeof y === 'undefined') {
        return true;
    }

    return (Math.abs(x - y) > 0.0001);
}

var line;
compareObjects = function(object1, object2, failures, elementName) {
    if (typeof failures === 'undefined') {
        line   = 0;
        failures = [];
        elementName = "";
    }
    
    for (var key in object1) {
        line  += 1;
        var nextObject = object1[key];
        if (typeof nextObject === 'object') {
            // Recurse
            console.warn(line, "------ ", key, ":");
            failures.push(false); // This is to keep line numbers relevant (objects have a line number, but no value)
            if (elementName === "") {
                elementName = key;
            } else {
                elementName = elementName + "_" + key;
            }
            compareObjects(nextObject, object2[key], failures, elementName);
            elementName = elementName.substring(0, elementName.length - key.length - 1);
        } else {
            var failure;
            if (typeof object2 === 'undefined') {
                results[elementName + "_" + key] = "IS NOT DEFINED";
                console.warn(key, "IS NOT DEFINED");
                return;
            } else if (typeof object1[key] === 'number') {
                failure = areNumbersDifferent(object1[key], object2[key]);
            } else {
                failure = (object1[key] !== object2[key]);
            }
            failures.push(failure); // false will be pushed for tests that have passed
            results[(elementName === "") ? key : elementName + "_" + key] = { expected: object1[key], actual: object2[key], result: failure ? "fail" : "pass" };
            console.warn(line, ": ", key, object1[key], object2[key], failure ? "fail" : "pass");
        }
    }

    return failures;
}

saveResults = function(failures) {
    allPassedFlag = allPassed(failures);
    if (allPassedFlag) {
        console.warn("all tests passed");
    } else {
        console.warn("mismatch values at line(s): " + convertFailuresToLineNumbers(failures));
    }

    nitpick.saveResults(allPassedFlag, results);
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