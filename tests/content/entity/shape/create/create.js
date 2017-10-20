// create shape entity test

// Pick a position in front of the avatar
var pos = Vec3.sum(MyAvatar.position, Vec3.multiply(0.7, Quat.getFront(MyAvatar.orientation)));
pos = Vec3.sum(pos, Vec3.multiply(0.7, Quat.getUp(MyAvatar.orientation))); 


// Define sphere properties
var properties = {
  type: "Sphere",
  position: pos,
  lifetime: 60
};

// Add the sphere and check its properties
var sphere = Entities.addEntity(properties);
properties = Entities.getEntityProperties(sphere);
print("Sphere added :" + sphere);
print(JSON.stringify(properties));

// clean up after test
Script.scriptEnding.connect(function () {
  Entities.deleteEntity(sphere)
});