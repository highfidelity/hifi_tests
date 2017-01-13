//
// Created by Bradley Austin Davis on 2016/12/12
// Copyright 2013-2016 High Fidelity, Inc.
//
// Distributed under the Apache License, Version 2.0.
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
/*global print, Resources, Test, MyAvatar, Entities, AnimationCache, SoundCache, Scene, Camera, Overlays, Audio, HMD, AvatarList, AvatarManager, Controller, UndoStack, Window, Account, GlobalServices, Script, ScriptDiscoveryService, LODManager, Menu, Vec3, Quat, AudioDevice, Paths, Clipboard, Settings, XMLHttpRequest, randFloat, randInt */
/*global ColorIndicator */

'use strict';

Script.include("./BenchmarkLib.js");

var AVATAR_TRACING_RULES = "" + 
    "trace.*=false\n" +
    "trace.app=true\n" +
    "trace.simulation.animation=true\n" +
    "trace.simulation.avatar.*=true\n" +
    "";

AVATAR_TRACING_RULES = DEFAULT_TRACING_RULES;

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));
var testScript = new TestScript();
testScript.addTest({
    name: "avatars",
    loader: TestScript.locationLoader("dev-chris.highfidelity.io",
							true,
							{ x: -22.3544, y: 2.86071, z: 0.221353 },
							{ x: 0, y: -0.793851, z: 0, w: 0.608112 }),
    tracingRules: AVATAR_TRACING_RULES,
    duration: 5
});
testScript.addTest({
    name: "avatars",
    loader: TestScript.locationLoader("dev-chris.highfidelity.io",
							true,
							{ x: 43.3435, y: -0.944245, z: 11.0739 },
							{ x: 0, y: 0.705829, z: 0, w: 0.708382 }),
    tracingRules: AVATAR_TRACING_RULES,
    duration: 5
});
//testScript.addTest({
//    name: "avatars-100",
//    loader: TestScript.sceneLoader("staticAvatars100"),
//    duration: 10
//});
testScript.runTests();
