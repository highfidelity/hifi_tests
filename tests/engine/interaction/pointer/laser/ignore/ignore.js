Script.include("../laserPointerUtils.js?raw=true");

var lasers = [];
lasers.push(LaserPointers.createLaserPointer({
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.0, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES | Picks.PICK_OVERLAYS,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: true
}));
lasers.push(LaserPointers.createLaserPointer({
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.0, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES | Picks.PICK_OVERLAYS,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: true
}));

LaserPointers.setRenderState(lasers[0], "one");
LaserPointers.setRenderState(lasers[1], "one");

var entities = [];
var overlays = [];
for (i = 0; i < 3; i++) {
    var properties = {
        type: "Shape",
        shape: "Cube",
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.25 - 0.5 * i, z:0}), Vec3.multiply(0.0, right)),
        color: {red:255, green:0, blue:0},
        dimensions: {x: 0.1, y: 0.1, z: 0.1},
        lifetime: 300,
        rotation: orientation
    };
    entities.push(Entities.addEntity(properties));

    properties = {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.0 - 0.5 * i, z:0}), Vec3.multiply(0.0, right)),
        color: {red:0, green:255, blue:0},
        dimensions: {x: 0.1, y: 0.1, z: 0.1},
        solid: true,
        alpha: 1.0,
        visible: true,
        rotation: orientation
    };
    overlays.push(Overlays.addOverlay("cube", properties));
}

print("Running LaserPointer ignore test - press <SPACE> to move through the test");

var index = 0;
var even = true;
var ignore = [];
Controller.keyPressEvent.connect(function(event){
    if (event.text === "SPACE") {
        if (index < entities.length) {
            if (even) {
                ignore.push(entities[index]);
            } else {
                ignore.push(overlays[index]);
            }
            LaserPointers.setIgnoreItems(lasers[0], ignore);
        } else if (ignore.length > 0) {
            ignore.splice(-1, 1);
        }
        LaserPointers.setIgnoreItems(lasers[1], ignore);

        if (!even) {
            index++;
        }
        if (index == 2 * entities.length) {
            index = 0;
            event = true;
            ignore = [];
            LaserPointers.setIgnoreItems(lasers[0], ignore);
            LaserPointers.setIgnoreItems(lasers[1], ignore);
        }
        even = !even;
    }
});

function cleanup() {
    for (i = 0; i < lasers.length; i++) {
        LaserPointers.removeLaserPointer(lasers[i]);
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