if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Light protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", undefined, undefined, function(testType) {
    Script.include('../common.js');

    var object;
    var backgroundZone;
    var entityProperties = setCommonEntityProperties();

    entityProperties.type = "Light";

    entityProperties.cloneable = false;
    entityProperties.cloneLifetime = 200;
    entityProperties.cloneLimit = 1;
    entityProperties.cloneDynamic = true;
    entityProperties.cloneAvatarEntity = false;
    entityProperties.cloneOriginID = "{12345678-4321-5555-7777-123412349876}";
    entityProperties.itemName = "item name";
    entityProperties.itemDescription = "item description";
    entityProperties.itemCategories = "item categories";
    entityProperties.itemArtist = "item artist";
    entityProperties.itemLicense = "item license";
    entityProperties.limitedRun = 123456;
    entityProperties.editionNumber = 876;
    entityProperties.entityInstanceNumber = 345;
    entityProperties.marketplaceID = "market place ID";
    entityProperties.staticCertificateVersion = 2;

    entityProperties.position = { x: 1.2, y: 3.4, z: 5.6 };
    entityProperties.color =  { red: 11, green: 33, blue: 55 };
    entityProperties.intensity =  2.0;
    entityProperties.falloffRadius = 6.0;
    entityProperties.isSpotlight = true;
    entityProperties.exponent = 0.25;
    entityProperties.cutoff = 45.0;
    entityProperties.registrationPoint = { x: 0.2, y: 0.4, z: 0.0444 };

    nitpick.addStep("Set up light", function () {
        object = Entities.addEntity(entityProperties);
    });

    nitpick.addStep("Test light", function () {
        var getProperties = Entities.getEntityProperties(object);
        saveResults(compareObjects(entityProperties, getProperties));
    });

    nitpick.addStep("Clean up after test", function () {
        Entities.deleteEntity(backgroundZone);
        Entities.deleteEntity(object);
    });

    var result = nitpick.runTest(testType);
});
