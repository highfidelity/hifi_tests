var _step = 0;
var createdEntities = [];
var outlineConfig = Render.getConfig("RenderMainView.OutlineEffect0");

print("Running Outline Test - press <SPACE> to go to next steps");
Selection.clearSelectedItemsList("contextOverlayHighlightList");
Selection.clearSelectedItemsList("contextOverlayHighlightList1");
Selection.clearSelectedItemsList("contextOverlayHighlightList2");
MyAvatar.goToLocation(
    {x:0, y:0, z:0},
    true,
    Quat.angleAxis(0, {x: 0, y: 1, z: 0}),
    true
);

resetConfig(Render.getConfig("RenderMainView.OutlineEffect0"));
resetConfig(Render.getConfig("RenderMainView.OutlineEffect1"));
resetConfig(Render.getConfig("RenderMainView.OutlineEffect2"));

// all objects will have a finite lifetime
var LIFETIME = 300; // 5 min

// Initial setup
var blueBox = Entities.addEntity({
    type: "Box",
    name: "BlueBox",
    position: {x:-1, y:0.5, z:-1},
    dimensions: {x:2, y:0.25, z:0.25},
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
var greenSphere = Entities.addEntity({
    type: "Sphere",
    name: "GreenSphere",
    position: {x:1, y:0.5, z:1},
    dimensions: {x:1.75, y:2.5, z:0.5},
    dynamic: false,
    lifetime: LIFETIME,
    color: { red: 0, green: 200, blue: 0 }
});
var snail = Entities.addEntity({
    type: "Model",
    name: "Snail",
    position: {x:0, y:0, z:2},
    dimensions: {x:2, y:2, z:2},
    dynamic: false,
    lifetime: LIFETIME,
    modelURL: "https://hifi-content.s3.amazonaws.com/jimi/snail/snail_Dance2.fbx"
});
var terrain = Entities.addEntity({
    type: "Model",
    name: "Terrain",
    position: {x:0, y:0, z:0},
    dynamic: false,
    lifetime: LIFETIME,
    modelURL: "http://mpassets.highfidelity.com/e0f5d1a8-7062-40e3-ab03-3d4910b2f6c4-v1/Nevada-Moon-Rocks.fbx"
});

createdEntities.push(blueBox);
createdEntities.push(redSphere);
createdEntities.push(greenSphere);
createdEntities.push(snail);
createdEntities.push(terrain);

var steps = [
    // Step 2
    function() {
        Selection.addToSelectedItemsList("contextOverlayHighlightList", "entity", blueBox)
    },
    // Step 3
    function() {
        Selection.addToSelectedItemsList("contextOverlayHighlightList", "entity", redSphere)
        Selection.addToSelectedItemsList("contextOverlayHighlightList", "entity", snail)
    },
    // Step 4
    function() {
        outlineConfig["width"] = 4;
    },
    // Step 5
    function() {
        outlineConfig["glow"] = true;
    },
    // Step 6
    function() {
        outlineConfig["colorR"] = 0;
        outlineConfig["colorG"] = 1;
        outlineConfig["colorB"] = 0.5;
    },
    // Step 7
    function() {
        outlineConfig["unoccludedFillOpacity"] = 0.1;
        outlineConfig["occludedFillOpacity"] = 0.5;
    },
    // Step 8
    function() {
        outlineConfig["glow"] = false;
    },
    // Step 9
    function() {
        outlineConfig = Render.getConfig("RenderMainView.OutlineEffect1");
        Selection.addToSelectedItemsList("contextOverlayHighlightList1", "avatar", MyAvatar.sessionUUID)
    },
    // Step 10
    function() {
        outlineConfig["glow"] = true;
        outlineConfig["width"] = 5;
        outlineConfig["intensity"] = 0.5;
        outlineConfig["colorR"] = 1;
        outlineConfig["colorG"] = 0;
        outlineConfig["colorB"] = 0;
        outlineConfig["unoccludedFillOpacity"] = 0.65;        
    },
    // Step 11
    function() {
        outlineConfig = Render.getConfig("RenderMainView.OutlineEffect2");
        Selection.addToSelectedItemsList("contextOverlayHighlightList2", "entity", terrain)
        Selection.addToSelectedItemsList("contextOverlayHighlightList2", "entity", greenSphere)
    },
    // Step 12
    function() {
        outlineConfig["unoccludedFillOpacity"] = 1.0;        
        outlineConfig["occludedFillOpacity"] = 0.25;        
    },
    // End
    function () {
        Selection.clearSelectedItemsList("contextOverlayHighlightList");
        Selection.clearSelectedItemsList("contextOverlayHighlightList1");
        Selection.clearSelectedItemsList("contextOverlayHighlightList2");
        resetConfig(Render.getConfig("RenderMainView.OutlineEffect0"));
        resetConfig(Render.getConfig("RenderMainView.OutlineEffect1"));
        resetConfig(Render.getConfig("RenderMainView.OutlineEffect2"));
    }
];

function resetConfig(config) {
    config["width"] = 2;
    config["glow"] = false;
    config["intensity"] = 0.9;
    config["colorR"] = 1;
    config["colorG"] = 0.7;
    config["colorB"] = 0.2;
    config["unoccludedFillOpacity"] = 0.0;
    config["occludedFillOpacity"] = 0.0;
}

Controller.keyPressEvent.connect(function(event){
    if (event.key == 32) {
        print("Playing Outline Test - _step "+(_step+2));
        steps[_step]();
        _step++;
        _step = Math.min(_step, steps.length-1);
    }
 });
 
 // clean up after test
Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
    resetConfig(Render.getConfig("RenderMainView.OutlineEffect0"));
    resetConfig(Render.getConfig("RenderMainView.OutlineEffect1"));
    resetConfig(Render.getConfig("RenderMainView.OutlineEffect2"));
});