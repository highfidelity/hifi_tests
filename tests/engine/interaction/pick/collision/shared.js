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

// Visualizes the collision points of the collision pick result using box entities
visualizePickCollisions = function (createdEntities, collisionResult, entityIntersection, pickPositionOffset, collisionDisplayDimensions) {
    var collisionRegion = collisionResult.collisionRegion;
    
    createdEntities.push(Entities.addEntity({
        color: COLOR_COLLISION_SELF,
        lifetime: ENTITY_LIFETIME,
        userData: ENTITY_USER_DATA,
        type: "Box",
        name: "Box",
        position: Vec3.sum(pickPositionOffset, entityIntersection.pickCollisionPoint),
        rotation: collisionRegion.orientation,
        dimensions: collisionDisplayDimensions
    }));
    
    createdEntities.push(Entities.addEntity({
        color: COLOR_COLLISION_OTHER,
        lifetime: ENTITY_LIFETIME,
        userData: ENTITY_USER_DATA,
        type: "Box",
        name: "Box",
        position: entityIntersection.entityCollisionPoint,
        dimensions: collisionDisplayDimensions
    }));
}