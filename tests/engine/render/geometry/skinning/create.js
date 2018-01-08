Script.include("../../../../utils/test_stage.js?raw=true")

var createdEntities = setupStage(true, true);
var posOri = getStagePosOriAt(0, 0, 0);

// Define avatar properties
var properties = {
  lifetime: 120,  
  type: "Model",  
  name: "animated model",
  position: posOri.pos,
  modelURL: "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/assets/models/geometry/avatars/art3mis/art3mis.fst",
  animation: {
    url: "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/assets/models/geometry/avatars/animations/side_step_right.fbx",
    running: true,
    loop: true,
    allowTranslation: false
  }
};

var model = Entities.addEntity(properties);
createdEntities.push(model);

// clean up after test
Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
});
