(function() { // BEGIN LOCAL_SCOPE

Script.include("../../../../../utils/test_stage.js?raw=true");

// Add the test Cases
var flags = { 
    hasAmbientLight: false
};
var createdEntities = setupStage(flags)
var createdOverlays = [];

var posOri = getStagePosOriAt(1, 0, 0);

var LIFETIME = 120;
var DIM = {x: 1.0, y: 1.2, z: 0.28};

createdOverlays.push(Overlays.addOverlay("model", {
              position: Vec3.sum(posOri.pos, Vec3.multiply(-0.5, Quat.getRight(posOri.ori))),
              lifetime: LIFETIME,
              url: Script.resolvePath("../../../../../../assets/models/geometry/avatars/kaya/Kaya.fbx"),
              dimensions: DIM,
              orientation: posOri.ori,
              isGroupCulled: false
}));

createdOverlays.push(Overlays.addOverlay("model", {
              position: Vec3.sum(posOri.pos, Vec3.multiply(0.5, Quat.getRight(posOri.ori))),
              lifetime: LIFETIME,
              url: Script.resolvePath("../../../../../../assets/models/geometry/avatars/kaya/Kaya.fbx"),
              dimensions: DIM,
              orientation: posOri.ori,
              isGroupCulled: true
}));

function cleanup() {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
    for (var i = 0; i < createdOverlays.length; i++) {
        Overlays.deleteOverlay(createdOverlays[i]);
    }
}
Script.scriptEnding.connect(cleanup);
}()); // END LOCAL_SCOPE
