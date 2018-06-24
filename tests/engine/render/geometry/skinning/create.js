Script.include(autoTester.getUtilsRootPath() + "test_stage.js");
    var createdEntities = setupStage();
    var assetsRootPath = autoTester.getAssetsRootPath();

	var posOri = getStagePosOriAt(0, 0, 0);

// Define avatar properties
var properties = {
  lifetime: 120,  
  type: "Model",  
  name: "animated model",
  position: posOri.pos,
  modelURL: assetsRootPath + "models/geometry/avatars/art3mis/art3mis.fst",
  animation: {
    url: assetsRootPath + "models/geometry/avatars/animations/side_step_right.fbx",
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
