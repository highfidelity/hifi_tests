if (typeof PATH_TO_THE_REPO_PATH_UTILS_FILE === 'undefined') PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("LaserPointer ignore test", Script.resolvePath("."), "primary", function(testType) {
    Script.include("../laserPointerUtils.js?raw=true");

    initializeTestData(autoTester.getOriginFrame());

    var lasers = [];
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, { x: 0.0, y: 0.5, z :0.0 }), Vec3.multiply(0.0, right)),
        direction: Vec3.normalize({ x: 0.0, y: -1.0, z: 0.0 }),
        filter: Picks.PICK_ENTITIES | Picks.PICK_OVERLAYS,
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        enabled: true
    }));
    lasers.push(Pointers.createPointer(PickType.Ray, {
        position: Vec3.sum(Vec3.sum(pos, { x: 0.0, y: 0.5, z: 0.0 }), Vec3.multiply(0.0, right)),
        direction: Vec3.normalize({ x: 0.0, y: -1.0, z: 0.0 }),
        filter: Picks.PICK_ENTITIES | Picks.PICK_OVERLAYS,
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        enabled: true
    }));

    Pointers.setRenderState(lasers[0], "one");
    Pointers.setRenderState(lasers[1], "one");

    var entities = [];
    var overlays = [];
    for (i = 0; i < 3; i++) {
        var properties = {
            type: "Shape",
            shape: "Cube",
            position: Vec3.sum(Vec3.sum(pos, { x: 0.0, y: 0.25 - 0.5 * i, z: 0.0 }), Vec3.multiply(0.0, right)),
            color: { red: 255, green: 0, blue: 0 },
            dimensions: { x: 0.1, y: 0.1, z: 0.1 },
            lifetime: 300,
            rotation: orientation
        };
        entities.push(Entities.addEntity(properties));

        properties = {
            position: Vec3.sum(Vec3.sum(pos, {x: 0.0, y:0.0 - 0.5 * i, z: 0.0}), Vec3.multiply(0.0, right)),
            color: { red: 0, green: 255, blue: 0 },
            dimensions: { x: 0.1, y: 0.1, z: 0.1 },
            solid: true,
            alpha: 1.0,
            visible: true,
            rotation: orientation
        };
        overlays.push(Overlays.addOverlay("cube", properties));
    }

    autoTester.addStep("Move back to see all the objects", function () {
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
    autoTester.addStepSnapshot("Initial position");

    autoTester.addStep("1st position", function () {
        var ignore = [];
        var step = 1;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("1st position");

    autoTester.addStep("Move to 2nd position", function () {
        var ignore = [];
        var step = 2;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("2nd position");

    autoTester.addStep("Move to 3rd position", function () {
        var ignore = [];
        var step = 3;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("3rd position");

    autoTester.addStep("Move to 4th position", function () {
        var ignore = [];
        var step = 4;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("4th position");

    autoTester.addStep("Move to 5th position", function () {
        var ignore = [];
        var step = 5;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("5th position");

    autoTester.addStep("Move to 6th position", function () {
        var ignore = [];
        var step = 6;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("6th position");

    autoTester.addStep("Move to 7th position", function () {
        var ignore = [];
        var step = 7;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("7th position");

    autoTester.addStep("Move to 8th position", function () {
        var ignore = [];
        var step = 8;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("8th position");

    autoTester.addStep("Move to 9th position", function () {
        var ignore = [];
        var step = 9;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("9th position");

    autoTester.addStep("Move to 10th position", function () {
        var ignore = [];
        var step = 10;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("10th position");

    autoTester.addStep("Move to 11th position", function () {
        var ignore = [];
        var step = 11;
        var even = true;
        var index = 0;
        for (var i = 0; i < step; ++i) {
            if (index < entities.length) {
                if (even) {
                    ignore.push(entities[index]);
                } else {
                    ignore.push(overlays[index]);
                }
                Pointers.setIgnoreItems(lasers[0], ignore);
            } else if (ignore.length > 0) {
                ignore.splice(-1, 1);
            }
            Pointers.setIgnoreItems(lasers[1], ignore);

            if (!even) {
                index++;
            }
            if (index == 2 * entities.length) {
                index = 0;
                event = true;
                ignore = [];
                Pointers.setIgnoreItems(lasers[0], ignore);
                Pointers.setIgnoreItems(lasers[1], ignore);
            }
            even = !even;
        }
    });
    autoTester.addStepSnapshot("11th position");
    
    autoTester.addStep("Clean up", function () {
        for (i = 0; i < lasers.length; i++) {
            Pointers.removePointer(lasers[i]);
        }
        for (i = 0; i < entities.length; i++) {
            Entities.deleteEntity(entities[i]);
        }
        for (i = 0; i < overlays.length; i++) {
            Overlays.deleteOverlay(overlays[i]);
        }
        lasers = [];
        entities = [];
        overlays = [];
    });
    
    var result = autoTester.runTest(testType);
});
