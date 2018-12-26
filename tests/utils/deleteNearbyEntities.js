// Remove all entities near the avatar
const TEST_RADIUS = 1000;
var entitiesToDelete = Entities.findEntities(MyAvatar.position, TEST_RADIUS);
for (var i = 0; i < entitiesToDelete.length; ++i) {
    Entities.deleteEntity(entitiesToDelete[i]);
}

Script.stop();
