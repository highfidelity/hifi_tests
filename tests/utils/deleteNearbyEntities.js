// Remove all entities in the test neighbourhood, unless in manual mode
const TEST_RADIUS = 1000;
var entitiesToDelete = Entities.findEntities(MyAvatar.position, TEST_RADIUS);
for (var i = 0; i < entitiesToDelete.length; ++i) {
    Entities.deleteEntity(entitiesToDelete[i]);
}
