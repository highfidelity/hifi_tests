ENTITY_LIFETIME = 60;
ENTITY_USER_DATA = JSON.stringify({ grabbableKey: { grabbable: false } });

COLOR_NEUTRAL = { red: 230, green: 230, blue: 230 };
// These are for visualization of the test picks
COLOR_NO_COLLISION = { red: 0, green: 255, blue: 0 };
COLOR_YES_COLLISION = { red: 255, green: 0, blue: 0 };
// These are for visualization of the collision points
COLOR_COLLISION_SELF = { red: 0, green: 128, blue: 255 };
COLOR_COLLISION_OTHER = { red: 255, green: 128, blue: 0 };

createTestPick = function (createdPicks, pickType, properties) {
    var testPick = Picks.createPick(pickType, properties);
    createdPicks.push(testPick);
    return testPick;
}

createEntity = function (createdEntities, properties) {
    var entity = Entities.addEntity(properties);
    createdEntities.push(entity);
    return entity;
}

clearTestPicks = function (createdPicks) {
    for (var i = 0; i < createdPicks.length; i++) {
        Picks.removePick(createdPicks[i]);
    }
    createdPicks.length = 0;
}

clearEntities = function (createdEntities) {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
    createdEntities.length = 0;
}

// Visualizes the position and shape of a pick with a given position offset. Currently only supports model and box picks. Visualized box picks will also change color depending on if there is a collision.
visualizePick = function (createdEntities, collisionResult, pickPositionOffset) {
    visualizePickAtExactPosition(createdEntities, collisionResult, Vec3.sum(collisionResult.collisionRegion.position, pickPositionOffset));
}

// Visualizes the position and shape of a pick at the exact position. Currently only supports model and box picks. Visualized box picks will also change color depending on if there is a collision.
visualizePickAtExactPosition = function (createdEntities, collisionResult, pickPosition) {
    var collisionRegion = collisionResult.collisionRegion;
    var shapeType = collisionRegion.shape.shapeType;
    var modelURL = collisionRegion.shape.modelURL;
    var entityName = shapeType + createdEntities.length;
    
    var entityType;
    if (shapeType == "hull" || shapeType == "compound" || shapeType == "simple-hull" || shapeType == "simple-compound" || shapeType == "static-mesh") {
        entityType = "Model";
    }
    else {
        // shapeType == "box"
        entityType = "Box";
    }
    
    var intersectColor;
    if (collisionResult.intersects == true) {
        intersectColor = COLOR_YES_COLLISION;
    }
    else {
        intersectColor = COLOR_NO_COLLISION;
    }
    
    var ent = {
        color: intersectColor,
        lifetime: ENTITY_LIFETIME,
        userData: ENTITY_USER_DATA,
        type: entityType,
        name: entityName,
        modelURL: modelURL,
        position: pickPosition,
        rotation: collisionRegion.orientation,
        dimensions: collisionRegion.shape.dimensions
    };
    
    createdEntities.push(Entities.addEntity(ent));
}

// Visualizes the collision points of the collision pick result using box entities
visualizePickCollisions = function (createdEntities, collisionResult, intersectingObject, pickPositionOffset, collisionDisplayDimensions) {
    var collisionRegion = collisionResult.collisionRegion;
    
    for (var i = 0; i < intersectingObject.collisionContacts.length; i++) {
        var collisionPointPair = intersectingObject.collisionContacts[i];
        
        createdEntities.push(Entities.addEntity({
            color: COLOR_COLLISION_SELF,
            lifetime: ENTITY_LIFETIME,
            userData: ENTITY_USER_DATA,
            type: "Box",
            name: "Box",
            position: Vec3.sum(pickPositionOffset, collisionPointPair.pointOnPick),
            rotation: collisionRegion.orientation,
            dimensions: collisionDisplayDimensions
        }));
        
        createdEntities.push(Entities.addEntity({
            color: COLOR_COLLISION_OTHER,
            lifetime: ENTITY_LIFETIME,
            userData: ENTITY_USER_DATA,
            type: "Box",
            name: "Box",
            position: collisionPointPair.pointOnObject,
            dimensions: collisionDisplayDimensions
        }));
    }
}

createOverlay = function (createdOverlays, overlayType, overlayData) {
    var overlay = Overlays.addOverlay(overlayType, overlayData);
    createdOverlays.push(overlay);
    return overlay;
}

clearOverlays = function (createdOverlays) {
    for (var i = 0; i < createdOverlays.length; i++) {
        Overlays.deleteOverlay(createdOverlays[i]);
    }
    createdOverlays.length = 0;
}

setOverlayProperties = function (overlays, properties) {
    for (var i = 0; i < overlays.length; i++) {
        var overlay = overlays[i];
        Overlays.editOverlay(overlay, properties);
    }
}

addScriptInterval = function (scriptIntervals, intervalLength, func) {
    var interval = Script.setInterval(func, intervalLength);
    scriptIntervals.push(interval);
    return interval;
}

clearScriptIntervals = function (scriptIntervals) {
    for (var i = 0; i < scriptIntervals.length; i++) {
        var interval = scriptIntervals[i];
        Script.clearInterval(interval);
    }
    scriptIntervals.length = 0;
}

createCollisionPointOverlay = function (collisionPointOverlays, collisionPointSize) {
    var overlay = createOverlay(collisionPointOverlays, "shape", {
        shape: "Sphere",
        dimensions: { x: collisionPointSize, y: collisionPointSize, z: collisionPointSize },
        isSolid: true,
        drawInFront: true
    });
    return overlay;
}

// Update overlay visualization for a collision pick
// All the overlays in pickVisualization overlays are assumed to be parented to baseOverlay
updatePickVisualization = function (baseOverlay, pickVisualizationOverlays, pickResult, pickPosOffset) {
    // When there is not enough time to get the result, the result may be empty, so we need to check for that
    if (pickResult.collisionRegion != undefined) {
        var overlayBottomPosition = Vec3.sum(
            pickResult.collisionRegion.position,
            Vec3.multiplyQbyV(pickResult.collisionRegion.orientation, pickPosOffset)
        );
        var overlayOrientation = pickResult.collisionRegion.orientation;
        Overlays.editOverlay(baseOverlay, {
            position: overlayBottomPosition,
            rotation: overlayOrientation
        });
        
        var collisionColor;
        if (pickResult.intersects) {
            collisionColor = COLOR_YES_COLLISION;
        } else {
            collisionColor = COLOR_NO_COLLISION;
        }
        setOverlayProperties(pickVisualizationOverlays, { color: collisionColor });
    }
}

// Visualize collision points, allocated to collisionPointOverlays
// If maxPoints is >= 0, limit the total amount of collision points
visualizeCollisionPoints = function (collisionPointOverlays, intersectingObjects, collisionPointSize, maxPoints) {
    // Allocate overlays since it's pretty expensive to add an overlay
    // Flattened list of collision point pairs. Odd is pick (self) and even is object (other)
    var collisionPoints = [];
    var hasMaxPoints = maxPoints >= 0;
    for (var i = 0; i < intersectingObjects.length; i++) {
        if (hasMaxPoints && collisionPoints.length >= maxPoints) {
            break;
        }
        var intersectingObject = intersectingObjects[i];
        for (var j = 0; j < intersectingObject.collisionContacts.length; j++) {
            if (hasMaxPoints && collisionPoints.length >= maxPoints) {
                break;
            }
            collisionPoints.push(intersectingObject.collisionContacts[j].pointOnPick);
            collisionPoints.push(intersectingObject.collisionContacts[j].pointOnObject);
        }
    }
    
    if (collisionPointOverlays.length < collisionPoints.length) {
        var toAdd = collisionPoints.length - collisionPointOverlays.length;
        for (var i = 0; i < toAdd; i++) {
            createCollisionPointOverlay(collisionPointOverlays, collisionPointSize);
        }
    }
    
    // Set positions and colors of overlays to match points
    var odd = true;
    for (var i = 0; i < collisionPoints.length; i++) {
        var collisionColor;
        if (odd) {
            collisionColor = COLOR_COLLISION_SELF;
        } else {
            collisionColor = COLOR_COLLISION_OTHER;
        }
        
        Overlays.editOverlay(collisionPointOverlays[i], {
            visible: true,
            color: collisionColor,
            position: collisionPoints[i]
        });
        
        odd = !odd;
    }
    
    // Make the rest of the overlays invisible
    for (var i = collisionPoints.length; i < collisionPointOverlays.length; i++) {
        Overlays.editOverlay(collisionPointOverlays[i], {
            visible: false
        });
    }
}