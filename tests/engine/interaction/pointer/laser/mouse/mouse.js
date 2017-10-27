Script.include("../laserPointerUtils.js?raw=true");

var lasers = [];
lasers.push(LaserPointers.createLaserPointer({
    joint: "Mouse",
    filter: Picks.PICK_ENTITIES,
    renderStates: [{name: "one", end: end1}],
    defaultRenderStates: [{name: "one", end: end2, distance: 2.0}],
    enabled: true
}));
LaserPointers.setRenderState(lasers[0], "one");

var entities = [];
var properties = {
    type: "Shape",
    shape: "Cube",
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(0.0, right)),
    dimensions: {x: 1.0, y: 1.0, z: 0.1},
    lifetime: 300,
    rotation: orientation
};
entities.push(Entities.addEntity(properties));

print("Running LaserPointer mouse test");

function cleanup() {
    for (i = 0; i < lasers.length; i++) {
        LaserPointers.removeLaserPointer(lasers[i]);
    }
    for (i = 0; i < entities.length; i++) {
        Entities.deleteEntity(entities[i]);
    }
    lasers = [];
    entities = [];
}
Script.scriptEnding.connect(cleanup);