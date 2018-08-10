Script.include("../laserPointerUtils.js?raw=true");
initializeTestData(MyAvatar.position);

var lasers = [];
lasers.push(Pointers.createPointer(PickType.Ray, {
    joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
    filter: Picks.PICK_ENTITIES,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    scaleWithAvatar: true,
    enabled: true
}));
Pointers.setRenderState(lasers[0], "one");

var entities = [];
var properties = {
    type: "Shape",
    shape: "Cube",
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0, z:0}), Vec3.multiply(0.0, right)),
    dimensions: {x: 0.1, y: 0.1, z: 0.1},
    lifetime: 300,
    rotation: orientation
};
entities.push(Entities.addEntity(properties));

print("Running LaserPointer scaleWithAvatar test - press <SPACE> to toggle the lasers");

var step = 0;
var scales = [ 1.0, 0.1, 5.0 ];
Controller.keyPressEvent.connect(function(event){
    if (event.text === "SPACE") {
        step = (step + 1) % scales.length;
        MyAvatar.scale = scales[step];
    }
});

function cleanup() {
    for (i = 0; i < lasers.length; i++) {
        Pointers.removePointer(lasers[i]);
    }
    for (i = 0; i < entities.length; i++) {
        Entities.deleteEntity(entities[i]);
    }
    lasers = [];
    entities = [];
}
Script.scriptEnding.connect(cleanup);