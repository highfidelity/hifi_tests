Script.include("../../../../utils/test_stage.js?raw=true")
    var createdEntities = setupStage(undefined, undefined, autoTester.getOriginFrame());

    var properties = {
        lifetime: 120,  
        type: "Model",  
        name: "invalid url model",
        position: getStagePosOriAt(0, -1, 0).pos,
        modelURL: "asdf"
    };

// invalid url model
createdEntities.push(Entities.addEntity(properties));

var assetsRootPath = autoTester.getAssetsRootPath();
properties.modelURL = assetsRootPath + "models/geometry/avatars/art3mis/art3mis.fst";
properties.position = getStagePosOriAt(0, 1, 0).pos;
properties.name = "valid url model";

// valid url model
createdEntities.push(Entities.addEntity(properties));

// clean up after test
Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
});
