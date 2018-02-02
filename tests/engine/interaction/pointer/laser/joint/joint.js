Script.include("../laserPointerUtils.js?raw=true");

var lasers = [];
lasers.push(Pointers.createPointer(PickType.Ray, {
    joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
    posOffset: {x: 0, y: 0, z: 0.1},
    //dirOffset: {x: 0, y: 0, z: 1.0},
    filter: Picks.PICK_ENTITIES,
    renderStates: [{name: "one", path: path2, end: end2}],
    defaultRenderStates: [{name: "one", path: path1, end: end1, distance: DEFAULT_DISTANCE}],
    enabled: true
}));
lasers.push(Pointers.createPointer(PickType.Ray, {
    joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
    posOffset: {x: 0.1, y: 0, z: 0},
    //dirOffset: {x: 1.0, y: 0, z: 0},
    filter: Picks.PICK_OVERLAYS,
    renderStates: [{name: "one", path: path3, end: end3}],
    defaultRenderStates: [{name: "one", path: path1, end: end1, distance: DEFAULT_DISTANCE}],
    enabled: true
}));
lasers.push(Pointers.createPointer(PickType.Ray, {
    joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
    posOffset: {x: 0, y: 0, z: -0.1},
    //dirOffset: {x: 0, y: 0, z: -1.0},
    filter: Picks.PICK_AVATARS,
    renderStates: [{name: "one", path: path4, end: end4}],
    defaultRenderStates: [{name: "one", path: path1, end: end1, distance: DEFAULT_DISTANCE}],
    enabled: true
}));
lasers.push(Pointers.createPointer(PickType.Ray, {
    joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
    posOffset: {x: -0.1, y: 0, z: 0},
    //dirOffset: {x: -1.0, y: 0, z: 0},
    filter: Picks.PICK_HUD,
    renderStates: [{name: "one", path: path7, end: end7}],
    defaultRenderStates: [{name: "one", path: path1, end: end1, distance: DEFAULT_DISTANCE}],
    enabled: true
}));
for (i = 0; i < lasers.length; i++) {
    Pointers.setRenderState(lasers[i], "one");
}

var entities = [];
var overlays = [];
var properties = {
    type: "Shape",
    shape: "Cube",
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(-0.6, right)),
    dimensions: {x: 0.5, y: 0.5, z: 0.1},
    color: {red:255, green:0, blue:0},
    lifetime: 300,
    rotation: orientation
};
entities.push(Entities.addEntity(properties));

properties.position = Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(0.6, right));
properties.color = {red:0, green:255, blue:0};
properties.solid = true;
properties.alpha = 1;
overlays.push(Overlays.addOverlay("cube", properties));

print("Running LaserPointer joint test");

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