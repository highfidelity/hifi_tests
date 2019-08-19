if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Polyvox protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", undefined, function(testType) {
    Script.include('../common.js');

    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "PolyVox";

    entityProperties.dimensions = { x: 2000.0, y: 2000.0, z: 2000.0 };
    entityProperties.voxelVolumeSize = { x:23, y: 29, z: 31 };
    entityProperties.voxelData="ads23SGResLiIUYoh987fTREdgdgDGdgdgDSDLLIJklj65edrcgddQ7Y"
    entityProperties.voxelSurfaceStyle = 3;

    entityProperties.xTextureURL = "http://xTextureURL";
    entityProperties.yTextureURL = "http://yTextureURL";
    entityProperties.zTextureURL = "http://zTextureURL";

    entityProperties.xNNeighborID = "{24454321-1434-6655-4344-123565649876}"
    entityProperties.yNNeighborID = "{12234311-1134-6346-4455-123565653876}"
    entityProperties.zNNeighborID = "{85533546-3444-4456-6448-345345654335}"
 
    entityProperties.xPNeighborID = "{87654321-1234-6666-4444-123412349876}"
    entityProperties.yPNeighborID = "{12312311-1134-6346-4455-123434553876}"
    entityProperties.zPNeighborID = "{85423546-3434-4566-6388-345345654335}"

    nitpick.addStep("Set up polyvox", function () {
        object = Entities.addEntity(entityProperties);
    });

    nitpick.addStep("Test polyvox", function () {
        var getProperties = Entities.getEntityProperties(object);
        saveResults(compareObjects(entityProperties, getProperties));
    });

    nitpick.addStep("Clean up after test", function () {
        Entities.deleteEntity(backgroundZone);
        Entities.deleteEntity(object);
    });

    var result = nitpick.runTest(testType);
});
