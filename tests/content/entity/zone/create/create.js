// Enabled draw zone bounding box and stack to visualize the stack of zone components
Render.getConfig("RenderMainView.DrawZoneStack").enabled = true
Render.getConfig("RenderMainView.DrawZones").enabled = true

// Create the zone centered at the avatar position
var pos = MyAvatar.position;

// As a 5 meters cube box
var dim = { x: 5.0, y: 5.0, z: 5.0};

// Define zone properties
var properties = {
  type: "Zone",
  name: "test create zone",
  position: pos,
  dimensions: dim,
  keyLight:{"color": {"red":0,"green":255,"blue":0}},
  backgroundMode:"skybox",
  skybox:{"color":{"red":0,"green":0,"blue":255}}
};

// Add the sphere and check its properties
var zone = Entities.addEntity(properties);
properties = Entities.getEntityProperties(zone);
print("Zone added :" + zone);
print(JSON.stringify(properties));


