Script.include("../laserPointerUtils.js?raw=true");

var lasers = [];
lasers.push(LaserPointers.createLaserPointer({
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.0, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES,
    renderStates: [{name: "one", start: start1, path: path1, end: end8}],
    faceAvatar: true,
    enabled: true
}));
LaserPointers.setRenderState(lasers[0], "one");

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

print("Running LaserPointer faceAvatar test - press <SPACE> to move through the test");

var index = 0;
var angle = index * 3.14/5.0;
MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
Controller.keyPressEvent.connect(function(event){
    if (event.text === "SPACE") {
        index++;
        angle = index * 3.14/5.0;
        MyAvatar.position = Vec3.sum(pos, Vec3.sum(Vec3.multiply(2.0 * Math.cos(angle), dir), Vec3.multiply(2.0 * Math.sin(angle), right)));
        MyAvatar.orientation = Quat.lookAt(MyAvatar.position, pos, Vec3.UP);
    }
});

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