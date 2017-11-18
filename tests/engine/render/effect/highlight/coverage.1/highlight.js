var _step = 0;
var createdEntities = [];
//var highlightConfig = Render.getConfig("UpdateScene.HighlightStageSetup");
//var debugConfig = Render.getConfig("RenderMainView.HighlightDebug");

print("Running Highlight Test - press <SPACE> to go to next steps");
//Selection.clearSelectedItemsList("TestHifi1");
//Selection.clearSelectedItemsList("highlightList1");
//Selection.clearSelectedItemsList("highlightList2");
MyAvatar.goToLocation(
    {x:0, y:0, z:0},
    true,
    Quat.angleAxis(0, {x: 0, y: 1, z: 0}),
    true
);

//resetConfig("highlightList1");
//resetConfig("highlightList2");

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
var greenPaint = Entities.addEntity({
    color: {
        blue: 10,
        green: 10,
        red: 10
    },
    position: {x:1.25, y:-0.5, z:1},
    dimensions: {
        "x": 1,
        "y": 2.1,
        "z": 0.1
    },
    linePoints: [
        {
            "x": 0,
            "y": 0,
            "z": 0
        },
        {
            "x": 0.10061257518827915,
            "y": 0.16649961471557617,
            "z": 0.001007152532110922
        },
        {
            "x": 0.23273462429642677,
            "y": 0.40803611278533936,
            "z": 0.0010143050894839689
        },
        {
            "x": 0.34589760005474091,
            "y": 0.63782751560211182,
            "z": 0.0010214576468570158
        },
        {
            "x": 0.51725380122661591,
            "y": 1.0473054647445679,
            "z": 0.0010309943900210783
        },
        {
            "x": 0.61552040278911591,
            "y": 1.2999576330184937,
            "z": 0.0010381469473941252
        },
        {
            "x": 0.71815483272075653,
            "y": 1.5337413549423218,
            "z": 0.0010429153189761564
        },
        {
            "x": 0.86931221187114716,
            "y": 1.8406063318252563,
            "z": 0.0010524520621402189
        },
        {
            "x": 0.91085426509380341,
            "y": 1.9616776704788208,
            "z": 0.0010548362479312345
        },
        {
            "x": 0.88525764644145966,
            "y": 2.0158451795578003,
            "z": 0.0010548362479312345
        },
        {
            "x": 0.81161491572856903,
            "y": 1.9779795408248901,
            "z": 0.0010500678763492033
        },
        {
            "x": 0.72746269404888153,
            "y": 1.8921512365341187,
            "z": 0.001045299504767172
        },
        {
            "x": 0.50455085933208466,
            "y": 1.6641658544540405,
            "z": 0.0010309943900210783
        },
        {
            "x": 0.32814018428325653,
            "y": 1.4712589979171753,
            "z": 0.0010190734610660002
        },
        {
            "x": 0.2354239858686924,
            "y": 1.3538247346878052,
            "z": 0.0010143050894839689
        }
    ],
    name: "hifi_polyline_markerStroke",
    normals: [
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        },
        {
            "x": -6.1036087572574615e-05,
            "y": 1.862645149230957e-09,
            "z": 1
        }
    ],
    rotation: {
        "w": 1,
        "x": 0,
        "y": 0,
        "z": 0
    },
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
    textures: "http://mpassets.highfidelity.com/53f930fb-a433-4ccf-8974-2c53a631e40e-v1/markerStroke.png",
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

createdEntities.push(blueBox);
createdEntities.push(redSphere);
createdEntities.push(greenPaint);
createdEntities.push(hifi);
createdEntities.push(terrain);

var steps = [
    // Step 2
    function() {
        resetConfig("TestHifi1");
// highlightConfig["selectionName"] = "contextOverlayHighlightList"        
        Selection.addToSelectedItemsList("TestHifi1", "entity", blueBox)
    },
    // Step 3
    function() {
        Selection.addToSelectedItemsList("TestHifi1", "entity", redSphere)
        Selection.addToSelectedItemsList("TestHifi1", "entity", hifi)
    },
    // Step 4
 /*    function() {
        var style = {
            outlineColor: { red: 255, green: 0, blue: 250 },
            outlineWidth: 5,
            outlineIntensity: 0.9,
            isOutlineSmooth: true,
            unoccludedFillOpacity: 0.1,
            occludedFillOpacity: 0.5,
        }
        Selection.enableListHighlight("TestHifi1", style)
    },
    // Step 5
   function() {
        debugConfig.viewMask = false;
        highlightConfig["outlineWidth"] = 4;
    },
    // Step 6
    function() {
        highlightConfig["isOutlineSmooth"] = true;
    },
    // Step 7
    function() {
        highlightConfig["colorR"] = 0;
        highlightConfig["colorG"] = 1;
        highlightConfig["colorB"] = 0.5;
    },
    // Step 8
    function() {
        highlightConfig["unoccludedFillOpacity"] = 0.1;
        highlightConfig["occludedFillOpacity"] = 0.5;
    },
    // Step 9
    function() {
        debugConfig.viewMask = true;
    },
    // Step 10
    function() {
        debugConfig.viewMask = false;
        highlightConfig["isOutlineSmooth"] = false;
    },
    // Step 11
    function() {
        highlightConfig["selectionName"] = "highlightList1"
        Selection.addToSelectedItemsList("highlightList1", "avatar", MyAvatar.sessionUUID)
    },
    // Step 12
    function() {
        highlightConfig["isOutlineSmooth"] = true;
        highlightConfig["outlineWidth"] = 5;
        highlightConfig["outlineIntensity"] = 0.5;
        highlightConfig["colorR"] = 1;
        highlightConfig["colorG"] = 0;
        highlightConfig["colorB"] = 0;
        highlightConfig["unoccludedFillOpacity"] = 0.65;        
    },
    // Step 13
    function() {
        highlightConfig["selectionName"] = "highlightList2";
        Selection.addToSelectedItemsList("highlightList2", "entity", greenPaint);
    },
    // Step 14
    function() {
        Selection.addToSelectedItemsList("highlightList2", "entity", terrain);
    },
    // Step 15
    function() {
        highlightConfig["unoccludedFillOpacity"] = 1.0;        
        highlightConfig["occludedFillOpacity"] = 0.25;        
    },
    // Step 16
    function() {
        Selection.clearSelectedItemsList("contextOverlayHighlightList");
    },
    // Step 17
    function() {
        Selection.clearSelectedItemsList("highlightList1");
        Selection.addToSelectedItemsList("contextOverlayHighlightList", "entity", hifi);
    },*/
    // End
    function () {
        Selection.clearSelectedItemsList("TestHifi1");
    //    Selection.clearSelectedItemsList("highlightList1");
    //    Selection.clearSelectedItemsList("highlightList2");
        //resetConfig("TestHifi1");
        Selection.disableListHighlight("TestHifi1");
    //    resetConfig("highlightList1");
    //    resetConfig("highlightList2");
    }
];

function resetConfig(selectionName) {
/*    
    highlightConfig["selectionName"] = selectionName    
    highlightConfig["outlineWidth"] = 2;
    highlightConfig["isOutlineSmooth"] = false;
    highlightConfig["outlineIntensity"] = 0.9;
    highlightConfig["colorR"] = 1;
    highlightConfig["colorG"] = 0.7;
    highlightConfig["colorB"] = 0.2;
    highlightConfig["unoccludedFillOpacity"] = 0.0;
    highlightConfig["occludedFillOpacity"] = 0.0;
*/
    var style = {
        outlineColor: { red: 0, green: 0, blue: 250 },
        outlineWidth: 5,
        outlineIntensity: 0.9,
        isOutlineSmooth: false,
        unoccludedFillOpacity: 0.5,
        occludedFillOpacity: 0.0,
    }
    Selection.enableListHighlight(selectionName, style)
}

Controller.keyPressEvent.connect(function(event){
    if (event.key == 32) {
        print("Playing Highlight Test - _step "+(_step+2));
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
    resetConfig("TestHifi1");
//    resetConfig("highlightList1");
//    resetConfig("highlightList2");
});