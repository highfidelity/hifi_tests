ENTITY_LIFETIME = 60;
ENTITY_USER_DATA = JSON.stringify({ grabbableKey: { grabbable: false } });

COLOR_NEUTRAL = { red: 230, green: 230, blue: 230 };
// These are for visualization of the test picks
COLOR_NO_COLLISION = { red: 255, green: 0, blue: 0 };
COLOR_YES_COLLISION = { red: 0, green: 255, blue: 0 };
// These are for visualization of the collision points
COLOR_COLLISION_SELF = { red: 0, green: 128, blue: 255 };
COLOR_COLLISION_OTHER = { red: 255, green: 128, blue: 0 };

createTestPick = function (createdPicks, pickType, properties) {
    createdPicks.push(Picks.createPick(pickType, properties));
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
    
    for (var i = 0; i < intersectingObject.collisionPointPairs.length; i++) {
        var collisionPointPair = intersectingObject.collisionPointPairs[i];
        
        createdEntities.push(Entities.addEntity({
            color: COLOR_COLLISION_SELF,
            lifetime: ENTITY_LIFETIME,
            userData: ENTITY_USER_DATA,
            type: "Box",
            name: "Box",
            position: Vec3.sum(pickPositionOffset, collisionPointPair.pick),
            rotation: collisionRegion.orientation,
            dimensions: collisionDisplayDimensions
        }));
        
        createdEntities.push(Entities.addEntity({
            color: COLOR_COLLISION_OTHER,
            lifetime: ENTITY_LIFETIME,
            userData: ENTITY_USER_DATA,
            type: "Box",
            name: "Box",
            position: collisionPointPair.object,
            dimensions: collisionDisplayDimensions
        }));
    }
}