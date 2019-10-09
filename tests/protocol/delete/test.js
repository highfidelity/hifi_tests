if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') {
    PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
    Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
    nitpick = createNitpick(Script.resolvePath("."));
}

nitpick.perform("Delete protocol sanity - TEST REQUIRES SERVER", Script.resolvePath("."), "secondary", undefined, function(testType) {
    Script.include('../common.js');

    var parentEntity;
    var childEntity1;
    var childEntity2;
    var childEntity3;

    var parentProperties = {
        name: "parentEntity",
        type: "Box",
        color: { red: 255, green: 0, blue: 0 },
        dimensions: { x: 0.5, y: 0.6, z: 0.7 },
        position: { x: 1, y: 2, z: 3 },
        dynamic: false,
        lifetime: 600,
    };

    var childEntityProperties = {
        type: "Box",
        name: "child",
        color: { red: 0, green: 255, blue: 0 },
        localPosition: { x: 0.1, y: 0.2, z: 0.3 },
        dimensions: { x: 0.3, y: 0.4, z: 0.5 },
        dynamic: false,
        parentID: null,
        lifetime: 600
    };

    nitpick.addStep("Create parentEntity", function () {
        parentEntity = Entities.addEntity(parentProperties, "avatar");
    });
    nitpick.addStep("Verify parentEntity", function () {
        var getProperties = Entities.getEntityProperties(parentEntity);
        saveResults(compareObjects(parentProperties, getProperties));
    });

    nitpick.addStep("Create childEntity1 of 3", function () {
        childEntityProperties.name = "childEntity1";
        childEntityProperties.parentID = parentEntity;
        childEntity1 = Entities.addEntity(childEntityProperties, "domain");
    });
    nitpick.addStep("Verify childEntity1", function () {
        var getProperties = Entities.getEntityProperties(childEntity1);
        saveResults(compareObjects(childEntityProperties, getProperties));
    });

    nitpick.addStep("Create childEntity2 of 3", function () {
        childEntityProperties.name = "childEntity2";
        childEntityProperties.parentID = childEntity1;
        childEntityProperties.color = { red: 0, green: 0, blue: 255 };
        childEntity2 = Entities.addEntity(childEntityProperties, "avatar");
    });
    nitpick.addStep("Verify childEntity2", function () {
        var getProperties = Entities.getEntityProperties(childEntity2);
        saveResults(compareObjects(childEntityProperties, getProperties));
    });

    nitpick.addStep("Create childEntity3 of 3", function () {
        childEntityProperties.name = "childEntity3";
        childEntityProperties.parentID = childEntity2;
        childEntityProperties.color = { red: 0, green: 255, blue: 255 };
        childEntity3 = Entities.addEntity(childEntityProperties, "domain");
    });
    nitpick.addStep("Verify childEntity3", function () {
        var getProperties = Entities.getEntityProperties(childEntity3);
        saveResults(compareObjects(childEntityProperties, getProperties));
    });

    nitpick.addStep("Delete childEntity1 --> all subsequent children should be deleted", function () {
        Entities.deleteEntity(childEntity1);
    });

    nitpick.addStep("Verify parent not deleted but all children are", function () {
        var failures = [];
        var properties = Entities.getEntityProperties(parentEntity);
        var parentEntityExists = (0 != Object.keys(properties).length);
        var line = 1;
        console.warn(line, "parentEntity not deleted", parentEntityExists ? "pass" : "fail");
        failures.push(!parentEntityExists);

        ++line;
        properties = Entities.getEntityProperties(childEntity1);
        var childEntity1Exists = (0 != Object.keys(properties).length);
        console.warn(line, "childEntity1 deleted", !childEntity1Exists ? "pass" : "fail");
        failures.push(childEntity1Exists);

        ++line;
        properties = Entities.getEntityProperties(childEntity2);
        var childEntity2Exists = (0 != Object.keys(properties).length);
        console.warn(line, "childEntity2 deleted", !childEntity2Exists ? "pass" : "fail");
        failures.push(childEntity2Exists);

        ++line;
        properties = Entities.getEntityProperties(childEntity3);
        var childEntity3Exists = (0 != Object.keys(properties).length);
        console.warn(line, "childEntity3 deleted", !childEntity3Exists ? "pass" : "fail");
        failures.push(childEntity3Exists);

        saveResults(failures);
    });

    nitpick.addStep("Clean up after test", function () {
        Entities.deleteEntity(parentEntity);
        Entities.deleteEntity(childEntity1);
        Entities.deleteEntity(childEntity2);
        Entities.deleteEntity(childEntity3);
    });

    var result = nitpick.runTest(testType);
});
