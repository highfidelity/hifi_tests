if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

Script.include("../laserPointerUtils.js?raw=true");
initializeTestData(getOriginFrame());

var lasers = [];
lasers.push(Pointers.createPointer(PickType.Ray, {
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(-0.75, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: true
}));
lasers.push(Pointers.createPointer(PickType.Ray, {
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(-0.25, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_OVERLAYS,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: true
}));
lasers.push(Pointers.createPointer(PickType.Ray, {
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.25, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_AVATARS,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: true
}));
lasers.push(Pointers.createPointer(PickType.Ray, {
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.75, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_HUD,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: true
}));

var entities = [];
var overlays = [];
for (i = 0; i < lasers.length; i++) {
    var properties = {
        type: "Shape",
        shape: "Cube",
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(-0.75 + i * 0.5, right)),
        color: {red:255, green:0, blue:0},
        dimensions: {x: 0.1, y: 0.1, z: 0.1},
        lifetime: 300,
        rotation: orientation
    };
    entities.push(Entities.addEntity(properties));

    properties = {
        position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.75 + i * 0.5, right)),
        color: {red:0, green:255, blue:0},
        dimensions: {x: 0.1, y: 0.1, z: 0.1},
        solid: true,
        alpha: 1.0,
        visible: true,
        rotation: orientation
    };
    overlays.push(Overlays.addOverlay("cube", properties));
}
var properties = {
    type: "Shape",
    shape: "Cube",
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:-3.0, z:0}), Vec3.multiply(0.0, right)),
    color: {red:255, green:0, blue:0},
    dimensions: {x: 1.0, y: 0.1, z: 1.0},
    lifetime: 300,
    rotation: orientation
};
entities.push(Entities.addEntity(properties));

for (i = 0; i < lasers.length; i++) {
    Pointers.setRenderState(lasers[i], "one");
}

print("Running LaserPointer collision test");

MyAvatar.position = Vec3.sum(Vec3.sum(Vec3.subtract(pos, Vec3.multiply(0.00807, dir)), {x:0, y:-2.0, z:0}), Vec3.multiply(0.25, right));

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