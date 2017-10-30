// tests/content/shape/create.js

// connect cleanup()
var entityIds = [];
function cleanup() {
    for (var i in entityIds) {
        Entities.deleteEntity(entityIds[i]);
    }
}
Script.scriptEnding.connect(cleanup);

var LIFETIME = 60; // 1 min

MyAvatar.orientation = { x: 0, y: 1, z: 0, w: 0 };

function makeLights() {
	var lightProperties = {
        name: "light",
    	type: "Light",
    	dimensions: { x: 20.0, y: 20.0, z: 20.0 },
    	parentID: this.entityID,
    	isSpotlight: false,
    	color: { red: 255, green: 255, blue: 255 },
    	exponent: 1,
    	intensity: 20.0,
    	falloffRadius: 4.0,
    	lifetime: LIFETIME,
    	position: { x: 0, y: 0, z: 0 },
	};

    var lightDistance = 3.0;

    // red
    lightProperties.name = "redLight";
	var localPosition = { x: lightDistance, y: 0, z: -1.5 * lightDistance };
    localPosition = Vec3.multiplyQbyV(MyAvatar.orientation, localPosition);
    var worldPosition = Vec3.sum(MyAvatar.position, localPosition);
	lightProperties.position = worldPosition;
	lightProperties.color = { red: 255, green: 0, blue: 0 };
	var redLight = Entities.addEntity(lightProperties);
	entityIds.push(redLight);

    // green
    lightProperties.name = "greenLight";
	localPosition = { x: 0, y: -lightDistance, z: -1.0 * lightDistance};
    localPosition = Vec3.multiplyQbyV(MyAvatar.orientation, localPosition);
    worldPosition = Vec3.sum(MyAvatar.position, localPosition);
	lightProperties.position = worldPosition;
	lightProperties.color = { red: 0, green: 255, blue: 0 };
	var greenLight = Entities.addEntity(lightProperties);
	entityIds.push(greenLight);

    // blue
    lightProperties.name = "blueLight";
	localPosition = { x: -lightDistance, y: 0, z: -1.5 * lightDistance};
    localPosition = Vec3.multiplyQbyV(MyAvatar.orientation, localPosition);
    worldPosition = Vec3.sum(MyAvatar.position, localPosition);
	lightProperties.position = worldPosition;
	lightProperties.color = { red: 0, green: 0, blue: 255 };
	var blueLight = Entities.addEntity(lightProperties);
	entityIds.push(blueLight);
}
makeLights();


// These are the shape types:
// NOTE: commented out shapes are not yet supported by the C++
var shapes = [
    "Triangle",
    "Quad",
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
var gridDistance = 4.5;
var gridStep = 0.55;

var SHAPE_DIMENSIONS = { x: 0.4, y: 0.4, z: 0.4 };

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
            dimensions: SHAPE_DIMENSIONS,
            lifetime: LIFETIME
        };
        var id = Entities.addEntity(properties);

        // save results for later
        entityIds.push(id);
        shapeCount++;
    }
}
