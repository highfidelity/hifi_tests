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

print("Running LaserPointer renderState test - press <SPACE> to move through the test");

var states = ["", "one", "two", "three", "four", "five"];
var index = 0;
Controller.keyPressEvent.connect(function(event){
    if (event.text === "SPACE") {
        Pointers.setRenderState(lasers[0], states[index]);
        index = (index+1) % states.length;
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