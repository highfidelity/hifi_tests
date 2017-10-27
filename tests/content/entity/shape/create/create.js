// tests/content/shape/create.js

// connect cleanup()
var entityIds = [];
function cleanup() {
    for (var i in entityIds) {
        Entities.deleteEntity(entityIds[i]);
    }
}
Script.scriptEnding.connect(cleanup);

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

var DIMENSIONS = { x: 0.4, y: 0.4, z: 0.4 };
var LIFETIME = 600; // 10 min

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
            dimensions: DIMENSIONS,
            lifetime: LIFETIME
        };
        var id = Entities.addEntity(properties);

        // save results for later
        entityIds.push(id);
        shapeCount++;
    }
}
