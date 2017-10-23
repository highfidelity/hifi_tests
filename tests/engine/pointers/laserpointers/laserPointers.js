var step = 0;

var START_DIMENSIONS = { x: 0.1, y: 0.1, z: 0.1 };
var END_DIMENSIONS = { x: 0.05, y: 0.05, z: 0.05 };

var COLOR1 = {red: 255, green: 0, blue: 0};
var COLOR2 = {red: 0, green: 255, blue: 0};
var COLOR3 = {red: 0, green: 0, blue: 255};
var COLOR4 = {red: 0, green: 255, blue: 255};
var COLOR5 = {red: 255, green: 0, blue: 255};

var start1 = {
    type: "sphere",
    dimensions: START_DIMENSIONS,
    color: COLOR1,
    ignoreRayIntersection: true
}
var path1 = {
    type: "line3d",
    color: COLOR1,
    alpha: 1,
    solid: true,
    glow: 1.0,
    ignoreRayIntersection: true
}
var end1 = {
    type: "sphere",
    dimensions: END_DIMENSIONS,
    color: COLOR1,
    ignoreRayIntersection: true
}

var start2 = {
    type: "sphere",
    dimensions: START_DIMENSIONS,
    color: COLOR2,
    ignoreRayIntersection: true
}
var path2 = {
    type: "line3d",
    color: COLOR2,
    alpha: 1,
    solid: true,
    glow: 1.0,
    ignoreRayIntersection: true
}
var end2 = {
    type: "sphere",
    dimensions: END_DIMENSIONS,
    color: COLOR2,
    ignoreRayIntersection: true
}

var start3 = {
    type: "sphere",
    dimensions: START_DIMENSIONS,
    color: COLOR3,
    ignoreRayIntersection: true
}
var path3 = {
    type: "line3d",
    color: COLOR3,
    alpha: 1,
    solid: true,
    glow: 1.0,
    ignoreRayIntersection: true
}
var end3 = {
    type: "sphere",
    dimensions: END_DIMENSIONS,
    color: COLOR3,
    ignoreRayIntersection: true
}

var start4 = {
    type: "sphere",
    dimensions: START_DIMENSIONS,
    color: COLOR4,
    ignoreRayIntersection: true
}
var path4 = {
    type: "line3d",
    color: COLOR4,
    alpha: 1,
    solid: true,
    glow: 1.0,
    ignoreRayIntersection: true
}
var end4 = {
    type: "sphere",
    dimensions: END_DIMENSIONS,
    color: COLOR4,
    ignoreRayIntersection: true
}

var end5 = {
    type: "cube",
    dimensions: END_DIMENSIONS,
    color: COLOR1,
    solid: true,
    ignoreRayIntersection: true
}
var end6 = {
    type: "sphere",
    dimensions: {x:0.5, y:0.5, z:0.5},
    color: COLOR1,
    ignoreRayIntersection: true
}

var path7 = {
    type: "line3d",
    color: COLOR5,
    alpha: 1,
    solid: true,
    glow: 1.0,
    ignoreRayIntersection: true
}
var end7 = {
    type: "sphere",
    dimensions: END_DIMENSIONS,
    color: COLOR5,
    ignoreRayIntersection: true
}

var renderStates = [{name: "one", start: start1, path: path1, end: end1},
                    {name: "two", start: start2, path: path2, end: end2},
                    {name: "three", start: start3, path: path3, end: end3},
                    {name: "four", start: start4, path: path4, end: end4},
                    {name: "five", start: start1, path: path1, end: end5}];
var DEFAULT_DISTANCE = 20;
var defaultRenderStates = [{name: "one", start: start1, path: path1, distance: DEFAULT_DISTANCE},
                           {name: "two", start: start1, path: path1, distance: DEFAULT_DISTANCE},
                           {name: "three", start: start1, path: path1, distance: DEFAULT_DISTANCE},
                           {name: "four", start: start1, path: path1, distance: DEFAULT_DISTANCE}];

var orientation = MyAvatar.orientation;
var dir = Quat.getForward(orientation);
dir.y = 0;
var pos = Vec3.sum(Vec3.sum(MyAvatar.position, Vec3.multiply(2.0, Vec3.normalize(dir))), {x:0, y:0.5, z:0});
var right = Quat.getRight(orientation);
var lasers = [];
lasers.push(LaserPointers.createLaserPointer({
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(-0.5, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES | Picks.PICK_OVERLAYS,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: true
}));
lasers.push(LaserPointers.createLaserPointer({
    position: Vec3.sum(pos, {x:0, y:0.5, z:0}),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_OVERLAYS,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    enabled: true
}));
lasers.push(LaserPointers.createLaserPointer({
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(-0.5, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates
}));
lasers.push(LaserPointers.createLaserPointer({
    position: Vec3.sum(Vec3.sum(pos, {x:0, y:0.5, z:0}), Vec3.multiply(0.5, right)),
    direction: Vec3.normalize({x: 0, y: -1, z: 0}),
    filter: Picks.PICK_ENTITIES | Picks.PICK_OVERLAYS,
    renderStates: renderStates,
    defaultRenderStates: defaultRenderStates,
    centerEndY: false,
    faceAvatar: true
}));
lasers.push(LaserPointers.createLaserPointer({
    joint: "Mouse",
    filter: Picks.PICK_ENTITIES | Picks.PICK_OVERLAYS | Picks.PICK_AVATARS,
    renderStates: [{name: "one", end: end6}],
    defaultRenderStates: [{name: "one", end: end1, distance: DEFAULT_DISTANCE}]
}));
lasers.push(LaserPointers.createLaserPointer({
    joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
    posOffset: {x: 0, y: 0, z: 0.1},
    dirOffset: {x: 0, y: 0, z: 1.0},
    filter: Picks.PICK_ENTITIES,
    renderStates: [{name: "one", path: path2, end: end2}],
    defaultRenderStates: [{name: "one", path: path1, end: end1, distance: DEFAULT_DISTANCE}]
}));
lasers.push(LaserPointers.createLaserPointer({
    joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
    posOffset: {x: 0.1, y: 0, z: 0},
    dirOffset: {x: 1.0, y: 0, z: 0},
    filter: Picks.PICK_OVERLAYS,
    renderStates: [{name: "one", path: path3, end: end3}],
    defaultRenderStates: [{name: "one", path: path1, end: end1, distance: DEFAULT_DISTANCE}]
}));
lasers.push(LaserPointers.createLaserPointer({
    joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
    posOffset: {x: 0, y: 0, z: -0.1},
    dirOffset: {x: 0, y: 0, z: -1.0},
    filter: Picks.PICK_AVATARS,
    renderStates: [{name: "one", path: path4, end: end4}],
    defaultRenderStates: [{name: "one", path: path1, end: end1, distance: DEFAULT_DISTANCE}]
}));
lasers.push(LaserPointers.createLaserPointer({
    joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
    posOffset: {x: -0.1, y: 0, z: 0},
    dirOffset: {x: -1.0, y: 0, z: 0},
    filter: Picks.PICK_HUD,
    renderStates: [{name: "one", path: path7, end: end7}],
    defaultRenderStates: [{name: "one", path: path1, end: end1, distance: DEFAULT_DISTANCE}]
}));

var entities = [];
var overlays = [];
var updateBox = false;
var steps = [
    // Step 1
    function() {
        LaserPointers.setRenderState(lasers[0], "one");
        LaserPointers.setRenderState(lasers[1], "one");
    },
    // Step 2
    function() {
        var properties = {
            type: "Shape",
            shape: "Cube",
            position: Vec3.sum(pos, {x:0, y:-0.5, z:0}),
            rotation: orientation,
            dimensions: {x: 1.5, y: 0.1, z: 0.1},
            lifetime: 600
        };
        entities.push(Entities.addEntity(properties));
        LaserPointers.setRenderState(lasers[0], "two");
    },
    // Step 3
    function() {
        var properties = {
            type: "Shape",
            shape: "Cube",
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(-0.5, right)),
            rotation: orientation,
            dimensions: {x: 0.4, y: 0.1, z: 0.1},
            lifetime: 600
        };
        entities.push(Entities.addEntity(properties));

        LaserPointers.setIgnoreItems(lasers[2], [entities[1]]);
        LaserPointers.setRenderState(lasers[2], "three");
        LaserPointers.enableLaserPointer(lasers[2]);
    },
    // Step 4
    function() {
        var properties = {
            position: Vec3.sum(pos, Vec3.multiply(-0.25, right)),
            rotation: orientation,
            dimensions: {x: 0.8, y: 0.1, z: 0.1},
            solid: true,
            alpha: 1.0,
            visible: true
        };
        overlays.push(Overlays.addOverlay("cube", properties));
        LaserPointers.setRenderState(lasers[1], "four");
    },
    // Step 5
    function() {
        LaserPointers.setRenderState(lasers[3], "five");
        LaserPointers.enableLaserPointer(lasers[3]);
    },
    // Step 6
    function() {
        var properties = {
            type: "Shape",
            shape: "Cube",
            position: Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.5, right)),
            rotation: orientation,
            dimensions: {x: 0.1, y: 0.05, z: 0.1},
            lifetime: 600
        };
        entities.push(Entities.addEntity(properties));
        LaserPointers.setLockEndUUID(lasers[3], entities[2], false);
    },
    // Step 7
    function() {
        for (i = 0; i < 4; i++) {
            LaserPointers.disableLaserPointer(lasers[i]);
        }
        LaserPointers.setRenderState(lasers[4], "one");
        LaserPointers.enableLaserPointer(lasers[4]);
    },
    // Step 8
    function() {
        print("Put on HMD.");
        LaserPointers.disableLaserPointer(lasers[4]);
        for (i = 5; i < 9; i++) {
            LaserPointers.setRenderState(lasers[i], "one");
            LaserPointers.enableLaserPointer(lasers[i]);
        }
    },
    // Step 9
    function() {
        cleanup();
    }
];

var time = 0;
function update(dt) {
    if (step == 6) {
        time += dt;
        Entities.editEntity(entities[2], {
            position: Vec3.sum(Vec3.sum(Vec3.sum(pos, {x:0, y:-0.25, z:0}), Vec3.multiply(0.5, right)), Vec3.multiply(0.5 * Math.sin(time), dir))
        });
    } else if (step == 7) {
        var result = LaserPointers.getPrevRayPickResult(lasers[4]);
        if (result.type == Picks.INTERSECTED_ENTITY) {
            end6.color = COLOR2;
        } else if (result.type == Picks.INTERSECTED_OVERLAY) {
            end6.color = COLOR3;
        } else if (result.type == Picks.INTERSECTED_AVATAR) {
            end6.color = COLOR4;
        }
        LaserPointers.editRenderState(lasers[4], "one", {end: end6});
    }
}
Script.update.connect(update);

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

print("Running LaserPointers Test - press <SPACE> to go to the next step");

Controller.keyPressEvent.connect(function(event){
    if (event.text === "SPACE") {
        if (step < steps.length) {
            print("Playing LaserPointers Test - step " + (step+1));
            steps[step]();
            step++;
        }
        if (step >= steps.length) {
            print("Finished LaserPointers Test");
        }
    }
 });
 