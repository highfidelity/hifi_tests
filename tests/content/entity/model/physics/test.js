// tests/content/shape/physics/test.js

// connect cleanup()
var entityIds = [];
var floorId;
function cleanup() {
    for (var i in entityIds) {
        Entities.deleteEntity(entityIds[i]);
    }
    Entities.deleteEntity(floorId);
}
Script.scriptEnding.connect(cleanup);

// all objects will have a finite lifetime
// and will be created with an offset so they are all visible at once
var LIFETIME = 120; // 2 min
var offset = { x: 0, y: -10, z: -18 };

// build a floor
if (true) {
    var floorColor = { red:100, green: 200, blue: 80 };

    var thickness = 1.0;
    var width = 40.0;
    var position = MyAvatar.position;
    var localPosition = { x: offset.x, y: offset.y, z: offset.z };
    localPosition.y = offset.y - 1.0 * MyAvatar.scale - 0.5 * thickness;
    var worldPosition = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, localPosition));
    var properties = {
        type: "Shape",
        shape: "Cube",
        name: "",
        position: worldPosition,
        dimensions: { x: width, y: thickness, z: width },
        lifetime: LIFETIME,
        color: floorColor
    };
    floorId = Entities.addEntity(properties);
}

// We will create a grid of entities, one instance of each shapeType
var shapeTypes = [
    "none",
    "box",
    "sphere",
    "compound",
    "simple-hull",
    "simple-compound",
    "static-mesh"
];

var urlPrefix = "http://localhost/~andrew/models/";
var models = [
    "threeCross-single-mesh.fbx",
    "threeCross-three-submeshes.fbx"
];
var compoundShapeURL = urlPrefix + "threeCross-hulls.obj";

var numModels = models.length;
var numShapeTypes = shapeTypes.length;

var width = 4.0;
var gap = 1.0;
var separation = width + gap;
var modelDimensions = { x: width, y: 0.5 * width, z: width };

var yOffset = offset.y;
for (var i = 0; i < numModels; i++) {
    var model = urlPrefix + models[i];
    var zOffset = offset.z - separation * (i + 1);
    for (var j = 0; j < numShapeTypes; j++) {
        var xOffset = offset.x + (j - 0.5 * (numShapeTypes - 1)) * separation;
        var localPosition = { x: xOffset, y: yOffset, z: zOffset };
        var worldPosition = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, localPosition));
        var properties = {
            type: "Model",
            name: models[i] + " with shapeType=" + shapeTypes[j],
            modelURL: urlPrefix + models[i],
            shapeType: shapeTypes[j],
            dynamic: false,
            lifetime: LIFETIME,
            position: worldPosition,
            dimensions: modelDimensions,
            compoundShapeURL: ""
        };
        if (shapeTypes[j] === "compound") {
            properties.compoundShapeURL = compoundShapeURL;
        }

        var id = Entities.addEntity(properties);
        entityIds.push(id);
    }
}
