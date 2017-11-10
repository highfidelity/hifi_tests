// Enabled draw zone bounding box and stack to visualize the stack of zone components
Render.getConfig("RenderMainView.DrawZoneStack").enabled = true

// Test material matrix
Script.include("../stage.js?raw=true")

// Add the test Cases
var createdEntities = setupStage()

var posOri = getStagePosOriAt({a:4, b:0, c:1})


// Define zone properties
var properties = {
  lifetime: 120,  
  type: "light",  
  name: "test create light",
  position: posOri.pos,

  name: "light",
  type: "Light",
  isSpotlight: false,
  color: { red: 255, green: 255, blue: 255 },
  exponent: 1,
  intensity: 1.0,
  falloffRadius: 5.0,
  dimensions: { x: 8.0, y: 8.0, z: 8.0 }, 
};

// Add the sphere and check its properties
var light = Entities.addEntity(properties);
createdEntities.push(light);

properties = Entities.getEntityProperties(light);
print("Light added :" + light);
print(JSON.stringify(properties));

createdEntities.push(light);


// clean up after test
Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
});
