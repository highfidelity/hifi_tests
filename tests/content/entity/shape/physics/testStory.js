// tests/content/shape/physics/test.js

var floorColor = { red:100, green: 200, blue: 80 };
var sampleColor = { red: 200, green: 255, blue: 255 };
var dynamicColor = { red: 200, green: 100, blue: 80 };

// connect cleanup()
var sampleEntityIds = [];
var dynamicEntityIds = [];
var floorId;
function cleanup() {
    for (var i in sampleEntityIds) {
        Entities.deleteEntity(sampleEntityIds[i]);
    }
    for (var i in dynamicEntityIds) {
        Entities.deleteEntity(dynamicEntityIds[i]);
    }
    Entities.deleteEntity(floorId);
}
Script.scriptEnding.connect(cleanup);

var LIFETIME = 600; // 10 min

// build a floor
if (true) {
    var thickness = 1.0;
    var width = 40.0;
    var position = MyAvatar.position;
    position.y = position.y - 1.0 * MyAvatar.scale - 0.5 * thickness;
    var properties = {
        type: "Shape",
        shape: "Cube",
        name: "",
        position: position,
        dimensions: { x: width, y: thickness, z: width },
        lifetime: LIFETIME,
        color: floorColor
    };
    floorId = Entities.addEntity(properties);
}

// These are the shape types:
// NOTE: commented out shapes are not yet supported by the C++
var shapes = [
    "Triangle",
    //"Quad",
    "Hexagon",
    "Octagon",
    "Circle",
    "Cube",
    "Sphere",
    "Tetrahedron",
    "Octahedron",
    "Dodecahedron",
    "Icosahedron",
    //"Torus",
    "Cone",
    "Cylinder"
];

// We will create a grid of entities, one instance of each shape,
var numShapes = shapes.length;
var numColumns = 3;
var numRows = Math.ceil(numShapes / numColumns);
var gridDistance = 3.0;
var gridStep = 0.5;

var shapeDimensions = { x: 0.4, y: 0.4, z: 0.4 };
// build a grid of entities in front of avatar
var shapeCount = 0;
for (var i = 0; i < numRows && shapeCount < numShapes; ++i) {
    var yOffset = (i - 0.5 * (numRows - 1)) * gridStep;
    for (var j = 0; j < numColumns && shapeCount < numShapes; ++j) {
        // compute position
        var xOffset = (j - 0.5 * (numColumns - 1)) * gridStep;
        var offset = { x: xOffset, y: yOffset, z: -gridDistance };
        offset = Vec3.multiplyQbyV(MyAvatar.orientation, offset);
        var worldPosition = Vec3.sum(MyAvatar.position, offset);

        // create the entitiy
        var properties = {
            type: "Shape",
            shape: shapes[shapeCount],
            name: shapes[shapeCount],
            position: worldPosition,
            dimensions: shapeDimensions,
            dynamic: false,
            lifetime: LIFETIME,
            color: sampleColor
        };
        var id = Entities.addEntity(properties);
        sampleEntityIds.push(id);
        shapeCount++;
    }
}

var rayPick = RayPick.createRayPick({
    joint: "Mouse",
    filter: RayPick.PICK_ENTITIES,
    enabled: true
});

function handleMousePressEvent(event) {
    if (event.isLeftButton !== true) {
        return;
    }

    // when one of the sample entities is clicked we'll create a temporary dynamic copy
    // that will fall to the floor so its collision responses can be observed

    var pickResult = RayPick.getPrevRayPickResult(rayPick);
    if (pickResult.type == RayPick.INTERSECTED_ENTITY) {
    	var id = pickResult.objectID;
		for (var i in sampleEntityIds) {
            if (id == sampleEntityIds[i]) {
    	        var properties = Entities.getEntityProperties(id);
                // create a dynamic copy of this entity in front of avatar
                print("clicked on " + properties.name);

                var localPosition = { x: 0.0, y: 1.0, z: -1.0 };
                var position = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, localPosition));
                var velocity = { x: 0.0, y: 1.0, z: -2.0 };
                velocity = Vec3.multiplyQbyV(MyAvatar.orientation, velocity);

                var newProperties = {
                    type: properties.type,
                    shape: properties.shape,
                    name: properties.name,
                    dimensions: properties.dimensions,
                    position : position,
                    dynamic : true,
                    gravity : { x: 0.0, y: -5.0, z: 0.0 },
                    velocity : velocity,
                    lifetime : 60,
                    color: dynamicColor
                };

                var id = Entities.addEntity(newProperties);
                dynamicEntityIds.push(id);
            }
		}
    }
}
Controller.mousePressEvent.connect(handleMousePressEvent);
