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
    "trace.*=true\n" +
    "*.detail=true\n" +
    "";

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));
var testScript = new TestScript();
testScript.addTest({
    name: "50Avatars",
    loader: TestScript.locationLoader("hifi://dev-chris2.highfidelity.io/115.3,0.1,31.4/0,0.737,0, 0.676", 1),
    tracingRules: AVATAR_TRACING_RULES,
    traceActions: TestScript.locationSteps([ {dt:0, pos:{x:115.3, y:0.1, z:31.4}, yaw:95},
    										 {dt:5, yaw:130},
    										 {dt:5, pos:{x:113.0, y:1.8, z:48.1}, yaw:31},
    										 {dt:5, yaw:90},
    										 {dt:5, yaw:50},
    										 {dt:5, pos:{x:99.9, y:0.0, z:22.2}, yaw:179}
    									   ]),
    duration: 30
});



testScript.runTests();

