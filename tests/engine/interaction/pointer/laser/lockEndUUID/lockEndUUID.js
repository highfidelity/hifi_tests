Script.include("../laserPointerUtils.js?raw=true");

var lasers = [];
lasers.push(Pointers.createPointer(PickType.Ray, {
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.0, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: true
}));
Pointers.setRenderState(lasers[0], "one");

var entities = [];
var overlays = [];
var properties = {
    type: "Shape",
    shape: "Cube",
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.25, right)),
    dimensions: {x: 0.1, y: 0.1, z: 0.5},
    lifetime: 300,
    color: {red:255, green:0, blue:0},
    rotation: orientation
};
entities.push(Entities.addEntity(properties));
properties.position = Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.25, right));
properties.color = {red:0, green:255, blue:0};
properties.solid = true;
properties.alpha = 1;
overlays.push(Overlays.addOverlay("cube", properties));

print("Running LaserPointer lockEndUUID test - press <SPACE> to move through the test");

var time = 0;
function update(dt) {
    time += dt;
    Entities.editEntity(entities[0], {
        position: Vec3.sum(Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.25, right)), Vec3.multiply(0.5 * Math.sin(time), dir))
    });
    Overlays.editOverlay(overlays[0], {
        position: Vec3.sum(Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.25, right)), Vec3.multiply(0.5 * Math.sin(time), dir))
    });
}
Script.update.connect(update);

var index = 0;
Controller.keyPressEvent.connect(function(event){
    if (event.text === "SPACE") {
        if (index == 0) {
            Pointers.setLockEndUUID(lasers[0], entities[0], false);
        } else if (index == 1) {
            Pointers.setLockEndUUID(lasers[0], overlays[0], true);
        } else {
            Pointers.setLockEndUUID(lasers[0], null, false);
        }
        index = (index+1) % 3;
    }
});

function cleanup() {
    for (i = 0; i < lasers.length; i++) {
        Pointers.removePointer(lasers[i]);
    }
    for (i = 0; i < entities.length; i++) {
        Entities.deleteEntity(entities[i]);
    }
    for (i = 0; i < overlays.length; i++) {
        Overlays.deleteOverlay(overlays[i]);
    }
    lasers = [];
    entities = [];
    overlays = [];
}
Script.scriptEnding.connect(cleanup);