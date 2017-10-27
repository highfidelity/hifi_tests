function findCurrentZone() {
    var foundEntitiesArray = Entities.findEntities(MyAvatar.position, 2.0);
    //print(foundEntitiesArray.length);
    var zone = null;

    foundEntitiesArray.forEach(function(foundID){
        var properties = Entities.getEntityProperties(foundID);
        if (properties.type == "Zone") {
            zone = foundID;
        } 
    });
    return zone;
}


var _step = 0;
var createdEntities = [];

// all objects will have a finite lifetime
var LIFETIME = 300; // 5 min

MyAvatar.goToLocation(
    {x:0, y:0, z:0},
    true,
    Quat.angleAxis(0, {x: 0, y: 1, z: 0}),
    true
);

var zoneProperties;
var zone = Entities.addEntity({
    lifetime: LIFETIME,  
    type: "Zone",  
    name: "Zone 2",
    position: {x:0, y:0, z:0},
    dimensions: {x:100, y:100, z:100},
    keyLight:{ 
        color: {red:255,green:255,blue:255},
        intensity: 1,
        direction: Vec3.fromPolar(70*Math.PI/180.0, -30*Math.PI/180.0),
    },
    backgroundMode:"skybox",
    skybox:{color:{red:100,green:200,blue:255}}
});
var blueBox = Entities.addEntity({
    type: "Box",
    name: "BlueBox",
    position: {x:-1, y:3.5, z:-3},
    dimensions: {x:5, y:5, z:5},
    dynamic: false,
    lifetime: LIFETIME,
    color: { red: 0, green: 0, blue: 155 }
});
var redSphere = Entities.addEntity({
    type: "Sphere",
    name: "RedSphere",
    position: {x:1, y:1, z:-1},
    dimensions: {x:0.5, y:0.5, z:0.5},
    dynamic: false,
    lifetime: LIFETIME,
    color: { red: 200, green: 0, blue: 0 }
});
var greenPaint = Entities.addEntity({
    color: {
        blue: 10,
        green: 10,
        red: 10
    },
    position: {x:1.25, y:-0.5, z:1},
    dimensions: {x:500, y:500, z:500},
    linePoints: [
        {x: 0, y: 0, z: 0},
        {x: 0.10061257518827915, y: 0.16649961471557617, z: 0.001007152532110922},
        {x: 0.23273462429642677, y: 0.40803611278533936, z: 0.0010143050894839689},
        {x: 0.34589760005474091, y: 0.63782751560211182, z: 0.0010214576468570158},
        {x: 0.51725380122661591, y: 1.0473054647445679, z: 0.0010309943900210783},
        {x: 0.61552040278911591, y: 1.2999576330184937, z: 0.0010381469473941252},
        {x: 0.71815483272075653, y: 1.5337413549423218, z: 0.0010429153189761564},
        {x: 0.86931221187114716, y: 1.8406063318252563, z: 0.0010524520621402189},
        {x: 0.91085426509380341, y: 1.9616776704788208, z: 0.0010548362479312345},
        {x: 0.88525764644145966, y: 2.0158451795578003, z: 0.0010548362479312345},
        {x: 0.81161491572856903, y: 1.9779795408248901, z: 0.0010500678763492033},
        {x: 0.72746269404888153, y: 1.8921512365341187, z: 0.001045299504767172},
        {x: 0.50455085933208466, y: 1.6641658544540405, z: 0.0010309943900210783},
        {x: 0.32814018428325653, y: 1.4712589979171753, z: 0.0010190734610660002},
        {x: 0.2354239858686924, y: 1.3538247346878052, z: 0.0010143050894839689}
    ],
    name: "hifi_polyline_markerStroke",
    normals: [
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: 1},
    ],
    rotation: {w: 1, x: 0, y: 0, z: 0},
    strokeWidths: [
        0.020000000949949026,
        0.030666666571050882,
        0.041333334520459175,
        0.052000000141561031,
        0.062666665762662888,
        0.073333331383764744,
        0.0839999970048666,
        0.094666667282581329,
        0.094666667282581329,
        0.0839999970048666,
        0.073333331383764744,
        0.062666665762662888,
        0.052000000141561031,
        0.041333334520459175,
        0.030666666571050882
    ],
    type: "PolyLine",
    lifetime: LIFETIME,
    dynamic: false,
});
var hifi = Entities.addEntity({
    type: "Model",
    name: "Hifi",
    position: {x:0, y:0, z:2},
    dimensions: {x:2, y:2, z:2},
    dynamic: false,
    lifetime: LIFETIME,
    modelURL: "https://github.com/highfidelity/hifi_tests/blob/master/assets/models/material_matrix_models/fbx/master/hifi.fbx?raw=true"
});
var terrain = Entities.addEntity(       {
    type: "PolyVox",
    name: "Terrain",
    position: {x:0, y:-3, z:5},
    dimensions: {x: 16, y: 16, z: 16},
    voxelData: "ABAAQAAQAAAAzgAAQAB42u3YMQ7DIBBE0bn/pZ0mRQxYRhFSwvr9bqn5mt05DmAdaeekndPOaeePl+T8kpxfcqadcYMfi6X+5wv/0/mfzv8cve+9/+A/fpr39/7Le/7jMf7Le/7jwff+wrwH//Hf9/66vA//+Y/t+/25vLff8x8F+v25vLff8x8V9v2p+36434P/2L7fG+T9cL93z/MfFfN+tN+75/mP/fN+rs97PzKK/yiW96P9Xn/HfxT0f5j3+jv+4zF5f9Xfgf+olvdX9zzq8wIVumOl",
    voxelSurfaceStyle: 0,
    voxelVolumeSize: {x: 16, y: 64, z: 16},
    lifetime: LIFETIME,
    dynamic: false,
    xTextureURL: "http://headache.hungry.com/~seth/hifi/dirt.jpeg",
    yTextureURL: "http://headache.hungry.com/~seth/hifi/grass.png",
    zTextureURL: "http://headache.hungry.com/~seth/hifi/dirt.jpeg"
});

createdEntities.push(zone);
createdEntities.push(blueBox);
createdEntities.push(redSphere);
createdEntities.push(greenPaint);
createdEntities.push(hifi);
createdEntities.push(terrain);

var steps = [
    // Step 2
    function() {
        zoneProperties = {
            visible: false
        };
        Entities.editEntity(zone, zoneProperties);
    },
    // Step 3
    function() {
        zoneProperties = {
            visible: true,
            keyLight: {
                intensity: 1,
                direction: Vec3.fromPolar(10*Math.PI/180.0, 30*Math.PI/180.0),
            }
        };
        Entities.editEntity(zone, zoneProperties);
    },
    // Step 4
    function() {
        Entities.editEntity(zone, initialZoneProperties)
        /*
        MyAvatar.goToLocation(
            {x:4.91982, y:0.271947, z:-54.7686},
            true,
            Quat.angleAxis(180, {x: 0, y: 1, z: 0}),
            true
        );
        */
    },
    // End
    function () {
    }
];

print("Running Shadows Test - press <SPACE> to go to next steps");

Controller.keyPressEvent.connect(function(event){
    if (event.key == 32) {
        steps[_step]();
        if (_step<steps.length-1) {
            print("Playing Shadows Test - _step "+(_step+2));
            _step++;
            _step = Math.min(_step, steps.length-1);
        } else {
            print("Playing Shadows Test - finished");
        }
        }
});
 
// clean up after test
Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
});