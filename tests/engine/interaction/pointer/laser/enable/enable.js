Script.include("../laserPointerUtils.js?raw=true");

var lasers = [];
lasers.push(LaserPointers.createLaserPointer({
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(-0.25, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: true
}));
lasers.push(LaserPointers.createLaserPointer({
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.25, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: false
}));

for (i = 0; i < lasers.length; i++) {
    LaserPointers.setRenderState(lasers[i], "one");
}

print("Running LaserPointer enable test - press <SPACE> to toggle the lasers");

var even = true;
Controller.keyPressEvent.connect(function(event){
    if (event.text === "SPACE") {
    	if (even) {
	   		LaserPointers.disableLaserPointer(lasers[0]);
	   		LaserPointers.enableLaserPointer(lasers[1]);
	   	} else {
	   		LaserPointers.disableLaserPointer(lasers[1]);
	   		LaserPointers.enableLaserPointer(lasers[0]);
	   	}
	   	even = !even;
    }
});

function cleanup() {
    for (i = 0; i < lasers.length; i++) {
        LaserPointers.removeLaserPointer(lasers[i]);
    }
}
Script.scriptEnding.connect(cleanup);