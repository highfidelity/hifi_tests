if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Modifiable Shadow - small zone", Script.resolvePath("."), "secondary", function(testType) {

    Script.include("../setup.js?raw=true");

    shadowSetupConfig = Render.getConfig("RenderMainView.ShadowSetup");

    zoneSize = 10.0;

    // move avatar back so objects can be seen
    originalPos = MyAvatar.position;
    nitpick.addStep("Change position", function () {
      var offset = { x: 0.0, y: 1.5, z: zoneSize / 2.0 };
      MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
      validationCamera_translate(offset);
    });

    // Add the test cases for each variable
    var createdEntities = [];
    nitpick.addStep("Set up test case", function () {
        createdEntities = setup(zoneSize, nitpick.getOriginFrame());
    });
    nitpick.addStep("Modify max distance", function () {
      shadowSetupConfig.globalMaxDistance = zoneSize;
    });
    nitpick.addStep("Change position", function () {
      var offset = { x: 0.0, y: 2.5, z: 2.0 };
      MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
      validationCamera_translate(offset);
    });
    nitpick.addStep("Change position", function () {
      var offset = { x: 0.0, y: 0.0, z: 1.5 };
      MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
      validationCamera_translate(offset);
    });
    nitpick.addStep("Change position", function () {
      var offset = { x: 0.0, y: 0.0, z: 1.5 };
      MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
      validationCamera_translate(offset);
    });

    nitpick.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });
    nitpick.addStep("Change position back", function () {
      MyAvatar.position = originalPos;
    });

    var result = nitpick.runTest(testType);
});
