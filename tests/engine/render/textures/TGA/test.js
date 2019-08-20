if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}
Script.include(nitpick.getUtilsRootPath() + "test_stage.js")

var assetsRootPath = nitpick.getAssetsRootPath();

nitpick.perform("TGA texture rendering", Script.resolvePath("."), "secondary", undefined, function(testType) {
    Script.include(nitpick.getUtilsRootPath() + "test_stage.js");
    var position = nitpick.getOriginFrame();

    var initData = {
        flags : { 
            hasAmbientLight: false
        },
        originFrame: nitpick.getOriginFrame()
    };
    var createdEntities = setupStage(initData);

    var testImage = Entities.addEntity({
        type: "Image",
        imageURL: assetsRootPath + "textures/tga-test-24bit-norle-opaque.tga",
        position: Vec3.sum(position, {x: 0.0, y: 0.72, z: -1.4 }),
        dimensions: { x: 1.419, y: 1.001, z: 0.01 },
        keepAspectRatio: false,
        color: "white",
        lifetime: 200
    });
    createdEntities.push(testImage);

    nitpick.addStepSnapshot("First texture");

    nitpick.addStep("Change texture", function () {
        Entities.editEntity(testImage, {imageURL: assetsRootPath + "textures/tga-test-24bit-rle-opaque.tga" });
    });
    nitpick.addStepSnapshot("Second texture");

    nitpick.addStep("Change texture", function () {
        Entities.editEntity(testImage, {imageURL: assetsRootPath + "textures/tga-test-32bit-norle-halfalpha.tga" });
    });
    nitpick.addStepSnapshot("Third texture");

    nitpick.addStep("Change texture", function () {
        Entities.editEntity(testImage, {imageURL: assetsRootPath + "textures/tga-test-32bit-norle-opaque.tga" });
    });
    nitpick.addStepSnapshot("Fourth texture");

    nitpick.addStep("Change texture", function () {
        Entities.editEntity(testImage, {imageURL: assetsRootPath + "textures/tga-test-32bit-norle-opaque-reversey.tga" });
    });
    nitpick.addStepSnapshot("Fifth texture");

    nitpick.addStep("Change texture", function () {
        Entities.editEntity(testImage, {imageURL: assetsRootPath + "textures/tga-test-32bit-rle-halfalpha.tga" });
    });
    nitpick.addStepSnapshot("Sixth texture");

    nitpick.addStep("Change texture", function () {
        Entities.editEntity(testImage, {imageURL: assetsRootPath + "textures/tga-test-32bit-rle-opaque.tga" });
    });
    nitpick.addStepSnapshot("Seventh texture");

    nitpick.addStep("Change texture", function () {
        Entities.editEntity(testImage, {imageURL: assetsRootPath + "textures/tga-test-32bit-rle-opaque-reversey.tga" });
    });
    nitpick.addStepSnapshot("Eight texture");

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    nitpick.runTest(testType);
});
