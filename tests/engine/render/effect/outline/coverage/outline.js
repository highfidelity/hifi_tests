var step = 0;
var outlineConfig = Render.getConfig("RenderMainView.OutlineEffect0");
var steps = [
    // Step 2
    function() {
        Selection.addToSelectedItemsList("contextOverlayHighlightList", "entity", "{9b06a757-337c-459a-b288-a9c6fb29b723}")
    },
    // Step 3
    function() {
        Selection.addToSelectedItemsList("contextOverlayHighlightList", "entity", "{db5623cf-80b5-42bf-82c9-9cf265130a2a}")
        Selection.addToSelectedItemsList("contextOverlayHighlightList", "entity", "{20a4b470-4846-4ec0-be22-97a2c12f598c}")
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
        Selection.addToSelectedItemsList("contextOverlayHighlightList2", "entity", "{6328ca51-27e8-44e5-a328-51422f20392d}")
    },
    // Step 12
    function() {
        MyAvatar.goToLocation(MyAvatar.position, true, Quat.angleAxis(0, {x: 0, y: 1, z: 0}), true);
        Selection.addToSelectedItemsList("contextOverlayHighlightList2", "entity", "{0489037e-13ae-4aae-8e71-8f629a088b88}")
    },
    // Step 13
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

print("Running Outline Test - press <SPACE> to go to next steps");
Selection.clearSelectedItemsList("contextOverlayHighlightList");
Selection.clearSelectedItemsList("contextOverlayHighlightList1");
Selection.clearSelectedItemsList("contextOverlayHighlightList2");
MyAvatar.goToLocation(
    {x:4.91982, y:0.271947, z:-54.7686},
    true,
    Quat.angleAxis(180, {x: 0, y: 1, z: 0}),
    true
);

resetConfig(Render.getConfig("RenderMainView.OutlineEffect0"));
resetConfig(Render.getConfig("RenderMainView.OutlineEffect1"));
resetConfig(Render.getConfig("RenderMainView.OutlineEffect2"));

Controller.keyPressEvent.connect(function(event){
    print("Playing Outline Test - step "+(step+2));
    steps[step]();
    step++;
    step = Math.min(step, steps.length-1);
 });
 