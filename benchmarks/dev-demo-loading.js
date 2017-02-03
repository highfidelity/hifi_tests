//
// Created by Sam Gateau on 2017/02/03
// Copyright 2013-2017 High Fidelity, Inc.
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
    name: "dev-demo-loading",
    loader: TestScript.locationLoader("hifi://dev-demo/115.3,0.1,31.4/0,0.737,0, 0.676", 0),
    tracingRules: AVATAR_TRACING_RULES,
    traceActions: TestScript.locationSteps([ {dt:1, pos:{x:86.3, y:0.0, z:30.3}, ori:{yaw:-127}}
    									   ]),
    duration: 20
});



testScript.runTests(true);

