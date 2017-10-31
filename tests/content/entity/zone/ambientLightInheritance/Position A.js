Script.include("setup.js?raw=true")

MyAvatar.orientation = avatarOriginOrientation;
MyAvatar.position  = {x: avatarOriginPosition.x, y: avatarOriginPosition.y, z: avatarOriginPosition.z + 1.0};

var newProperty = { 
  position: {x: MyAvatar.position.x, y: MyAvatar.position.y + 1.0, z: MyAvatar.position.z - 3.0}
};

Entities.editEntity(objectProperties, newProperty);

true;