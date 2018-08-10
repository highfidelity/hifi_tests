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

Script.include("../BenchmarkLib.js");

var AVATAR_TRACING_RULES = "" + 
    "trace.*=true\n" +
    "*.detail=true\n" +
    "";

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath("../.."));
var testScript = new TestScript();
testScript.addTest({
    name: "SpotAuto",
    loader: TestScript.locationLoader("hifi://engine-dev.highfidelity.io/-19,-10,7/0,0.9652830362319946,0,-0.2612062096595764", 1),
    tracingRules: AVATAR_TRACING_RULES,
    duration: 10
});



testScript.runTests();

