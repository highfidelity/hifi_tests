if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var nitpick = createNitpick(Script.resolvePath("."));

nitpick.perform("ParticleEffect emitterShouldTrail", Script.resolvePath("."), "secondary", function(testType) {
    var LIFETIME = 200;

    var createdEntities = [];

    function getPos(x, y, z) {
        return Vec3.sum(MyAvatar.position, Vec3.sum(Vec3.multiply(x, Quat.getRight(MyAvatar.orientation)),
                                           Vec3.sum(Vec3.multiply(y, Quat.getUp(MyAvatar.orientation)),
                                                    Vec3.multiply(z, Quat.getForward(MyAvatar.orientation)))));
    }

    nitpick.addStep("Move back to see all the objects", function () {
        var offset = { x: 0.0, y: 0.0, z: 2.0 };
        MyAvatar.position = Vec3.sum(MyAvatar.position, offset);
        validationCamera_translate(offset);

        // Set all angles to 0
        var q0 = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
        MyAvatar.orientation = q0;

        MyAvatar.bodyYaw =   0.0;
        MyAvatar.bodyPitch = 0.0;
        MyAvatar.bodyRoll =  0.0;
        MyAvatar.headYaw =   0.0;
        MyAvatar.headPitch = 0.0;
        MyAvatar.headRoll =  0.0;

        Camera.setOrientation(q0);
    });

    nitpick.addStep("Create particles", function () {
        createdEntities.push(Entities.addEntity({
            type: "ParticleEffect",
            position: getPos(-1, -1, 5),
            textures: Script.resolvePath("../../../../../assets/textures/redArrow.jpg"),
            isEmitting: true,
            emitterShouldTrail: false,
            lifespan: 1,
            maxParticle: 6,
            emitRate: 6,
            emitSpeed: 2,
            speedSpread: 0,
            emitAcceleration: {x: 0, y: 0, z: 0},
            accelerationSpread: {x: 0, y: 0, z: 0},
            alpha: 1.0,
            particleRadius: 0.25,
            lifetime: LIFETIME
        }));

        createdEntities.push(Entities.addEntity({
            type: "ParticleEffect",
            position: getPos(1, -1, 5),
            textures: Script.resolvePath("../../../../../assets/textures/redArrow.jpg"),
            isEmitting: true,
            emitterShouldTrail: true,
            lifespan: 1,
            maxParticle: 6,
            emitRate: 6,
            emitSpeed: 2,
            speedSpread: 0,
            emitAcceleration: {x: 0, y: 0, z: 0},
            accelerationSpread: {x: 0, y: 0, z: 0},
            alpha: 1.0,
            particleRadius: 0.25,
            lifetime: LIFETIME
        }));
    });

    var t = 0;
    Script.update.connect(function (dt) {
        Entities.editEntity(createdEntities[0], {
            position: getPos(-1 + 0.5 * Math.cos(t), -1, 5)
        });

        Entities.editEntity(createdEntities[1], {
            position: getPos(1 + 0.5 * Math.cos(t), -1, 5)
        });
        t += dt;
    });

    nitpick.addStepSnapshot("Take snapshot of all the particles");

    function cleanup() {
        for (var i in createdEntities) {
            Entities.deleteEntity(createdEntities[i]);
        }
    }

    nitpick.addStep("Clean up after test", function () {
        cleanup()
    });

    Script.scriptEnding.connect(cleanup);

    var result = nitpick.runTest(testType);
});