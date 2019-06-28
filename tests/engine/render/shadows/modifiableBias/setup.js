// Test shadow setup

// To use this script, include it, and call "setup(altitude, azimuth, originFrame)",
// altitude and azimuth being the key light angles.
// The function returns an array of created entities.
//
// The models are loaded from the "MODEL_DIR_URL" located on github where we store all our test models

// Test material matrix
Script.include(nitpick.getUtilsRootPath() + "test_shadow_environment.js");

var assetsRootPath = nitpick.getAssetsRootPath();

var LIFETIME = 1000;

setup = function (zoneSize, originFrame) {
    // Create backdrop
    var initData = {
        flags : {
            hasZone: false,
            hasKeyLight: false,
            hasAmbientLight: false
        },
        originFrame: nitpick.getOriginFrame()
    };
    var entities = setupStage(initData);

    // Create zone
    entities.push(Entities.addEntity({
        type: "Zone",
        name: "Zone for Shadow Tests",
        lifetime: LIFETIME,

        position: originFrame,
        dimensions: { x: zoneSize * 2.0, y: zoneSize * 2.0, z: zoneSize * 2.0},

        keyLightMode: "enabled",
        keyLight:{
          direction: {
              "x": 0.1,
              "y": -0.4,
              "z": -0.2
          },
            intensity: 1.0,
            castShadows: true
        },

        ambientLightMode: "enabled",
        ambientLight: {
            ambientIntensity: 1.0,
            ambientURL: assetsRootPath + "skymaps/Sky_Day-Sun-Mid-photo-ambient.texmeta.json",
        }
    }));

    // build surrounding walls
    entities.push(Entities.addEntity({
        type: "Box",
        name: "Wall_1",
        position: { x: originFrame.x - zoneSize, y: originFrame.y + zoneSize, z: originFrame.z},
        dimensions: { x: zoneSize * 2.0, y: 0.5, z: zoneSize * 2.0},
        rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 90.0),
        lifetime: LIFETIME,
        canCastShadow: true
    }));
    entities.push(Entities.addEntity({
        type: "Box",
        name: "Wall_2",
        position: { x: originFrame.x, y: originFrame.y + zoneSize, z: originFrame.z - zoneSize},
        dimensions: { x: zoneSize * 2.0, y: 0.5, z: zoneSize * 2.0},
        rotation: Quat.fromPitchYawRollDegrees(90.0, 0.0, 0.0),
        lifetime: LIFETIME,
        canCastShadow: true
    }));

    // add objects and tiled platforms to scene
    tileSize = 10.0;
    doubleTileSize = tileSize * 2.0;
    totalTiles = (zoneSize / tileSize);
    modelSize = 1.5;
    shift = tileSize / 5.0;
    scaleZ = 0;
    scaleX = 0;

    tilePosition = { x: originFrame.x - zoneSize + tileSize, y: originFrame.y,
                     z: originFrame.z + zoneSize + tileSize };
    for (i = 0; i < (totalTiles * totalTiles); i++) {
      alternatingTileColor = { "red":255,"green":255,"blue":255 };
      if (i % 2 != 0) {
        alternatingTileColor = { "red":240,"green":230,"blue":250 };
      }
      if (i % totalTiles == 0) {
        tilePosition = { x: originFrame.x - zoneSize + tileSize + (scaleX * doubleTileSize),
                         y: originFrame.y,
                         z: originFrame.z + zoneSize  + tileSize - (scaleZ * doubleTileSize)};
        scaleX = 0;
        scaleZ++;
      }
      tilePosition = { x: originFrame.x - zoneSize + tileSize + (scaleX * doubleTileSize),
                       y: originFrame.y,
                       z: originFrame.z + zoneSize  + tileSize - (scaleZ * doubleTileSize)};
      entities.push(Entities.addEntity({
          type: "Box",
          name: "Platform_" + i,
          color: alternatingTileColor,
          position: tilePosition,
          dimensions: { x: doubleTileSize, y: 0.5, z: doubleTileSize },
          lifetime: LIFETIME,
          canCastShadow: true
      }));
      scaleX++;

      for (j = 0; j < tileSize; j += 3) {
        positionChange = (tileSize / -2) + j + doubleTileSize;
        boxPosition = { x: tilePosition.x , y: tilePosition.y,
                        z: tilePosition.z - (doubleTileSize * 0.75) };
        entities.push(Entities.addEntity({
           type: "Box",
           name: "Box_" + j,
           color: { "red":200, "green":50, "blue":100 * j },
           position: { x: boxPosition.x - shift + positionChange - (doubleTileSize * 0.75),
                       y: boxPosition.y + (1.5 * modelSize),
                       z: boxPosition.z - shift + positionChange },
           dimensions: { x: modelSize, y: modelSize, z: modelSize },
           lifetime: LIFETIME,
           canCastShadow: true
        }));
        if (j != tileSize / 2) {
          entities.push(Entities.addEntity({
            type: "Box",
            name: "Box_Tilted_" + j,
            color: { "red":200, "green":100 * j, "blue":50 },
            position: { x: (boxPosition.x - shift) - positionChange + doubleTileSize,
                        y: boxPosition.y + 0.25 + 1.4 * (modelSize / 2),
                        z: (boxPosition.z - shift) + positionChange },
            dimensions: { x: modelSize, y: modelSize, z: modelSize },
            rotation: Quat.fromPitchYawRollDegrees(0.0, 0.0, 50.0),
            lifetime: LIFETIME,
            canCastShadow: true
          }));
        }
        entities.push(Entities.addEntity({
          type: "Sphere",
          name: "Sphere_Cast" + j,
          color: { "red":100 * j, "green":50, "blue":200 },
          position: { x: boxPosition.x + (zoneSize / 10),
                      y: boxPosition.y + (2.5 * modelSize),
                      z: boxPosition.z + positionChange},
          dimensions: { x: modelSize, y: modelSize, z: modelSize},
          lifetime: LIFETIME,
          canCastShadow: true
        }));
      }
    }

    return entities
}
