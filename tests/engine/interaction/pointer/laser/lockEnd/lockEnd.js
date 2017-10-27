Script.include("../laserPointerUtils.js?raw=true");

var lasers = [];
lasers.push(LaserPointers.createLaserPointer({
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.0, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    lockEnd: true,
    enabled: true
}));
LaserPointers.setRenderState(lasers[0], "one");

var entities = [];
var properties = {
    type: "Shape",
    shape: "Cube",
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(0.0, right)),
    dimensions: {x: 0.5, y: 0.1, z: 0.1},
    lifetime: 300,
    rotation: orientation
};
entities.push(Entities.addEntity(properties));

print("Running LaserPointer lockEnd test");

var time = 0;
function update(dt) {
    time += dt;
    Entities.editEntity(entities[0], {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.5 * Math.sin(time), right))
    });
}
Script.update.connect(update);

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