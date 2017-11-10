var MODEL_DIMS = {"x":0.809423565864563,"y":0.9995689988136292,"z":0.8092837929725647};
var MODEL_SCALE = 0.75;
var MODEL_SPIN = 0.0;
var ROOT_Y_OFFSET = -0.1;
var ROOT_Z_OFFSET = 3.0;
var LIFETIME = 120;
var BACKDROP_SIZE = 16;
var BACKDROP_HALFSIZE = 8;

function getTileColor(a, b, c) {
    return { red: 255, green: 255, blue: 255 };
}

function addTestBackdrop(name, position, orientation) {
    var backdrop = [];
    var unit = 0.5;
    var cellSize = unit * 0.9;

   // var cellDim =  Vec3.multiply(unit, MODEL_DIMS);
    var cellDim =  { x: cellSize, y: cellSize, z: cellSize};
    
    var axisA = Quat.getForward(orientation);
    var axisB = Quat.getRight(orientation);
    var axisC = Quat.getUp(orientation);
    
    var under = Vec3.sum(position, Vec3.multiply(-1.5 * unit, Quat.getUp(orientation)))
    var far = Vec3.sum(position, Vec3.multiply(5 * unit, Quat.getForward(orientation)))

    var lightDir = Vec3.normalize(Vec3.sum(Vec3.multiply(-1, Quat.getUp(orientation)),
                                           Vec3.multiply(-1, Quat.getRight(orientation))))

    
    var origin = Vec3.sum(stageRoot, Vec3.multiply(-2 * unit, axisC));                                           
    for (i = -BACKDROP_HALFSIZE; i < BACKDROP_HALFSIZE; i++) {
        var originX = Vec3.sum(origin, Vec3.multiply(i * unit, axisA));
        for (j = -BACKDROP_HALFSIZE; j < BACKDROP_HALFSIZE; j++) {
            var originB = Vec3.sum(originX, Vec3.multiply(j * unit, axisB));
            backdrop.push(Entities.addEntity({
                type: "Shape",
                shape: "Cube",
                name: "Backdrop",
                color: getTileColor(i, j, 0),
                position: originB,    
                rotation: orientation,    
                dimensions: cellDim,
                lifetime: LIFETIME,
            }));
        }
    }                                        
    