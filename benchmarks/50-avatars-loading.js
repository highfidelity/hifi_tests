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
    "trace.script*=false\n" +
    "trace.render*=true\n" +
    "trace.resource*=true\n" +
    "";

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));
var testScript = new TestScript();
testScript.addTest({
    name: "50Avatars",
    loader: TestScript.locationLoader("hifi://dev-chris2.highfidelity.io/115.3,0.1,31.4/0,0.737,0, 0.676", 0),
    tracingRules: AVATAR_TRACING_RULES,
    traceActions: TestScript.locationSteps([ {dt:1, pos:{x:99.9, y:2.0, z:22.2}, ori:{yaw:179}}
    									   ]),
    duration: 25
});



testScript.runTests();

