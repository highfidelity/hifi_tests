//
// Created by Bradley Austin Davis on 2017/06/25
// Copyright 2013-2017 High Fidelity, Inc.
//
// Distributed under the Apache License, Version 2.0.
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
/*global print, Resources, Test, MyAvatar, Entities, AnimationCache, SoundCache, Scene, Camera, Overlays, Audio, HMD, AvatarList, AvatarManager, Controller, UndoStack, Window, Account, GlobalServices, Script, ScriptDiscoveryService, LODManager, Menu, Vec3, Quat, AudioDevice, Paths, Clipboard, Settings, XMLHttpRequest, randFloat, randInt */
/*global ColorIndicator */

'use strict';

var TRACING_RULES = "" + 
"trace.*=false\n" +
"trace.app=true\n" +
"trace.render=true\n" +
"*.detail=false\n" +
"";

Window.location = "hifi://127.0.0.0"
Script.include("./BenchmarkLib.js");
Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));
var testScript = new TestScript();
testScript.addTest({
    name: "dev-demo_overview",
    tracingRules: TRACING_RULES,
    duration: 10,
    loader: TestScript.locationLoader("hifi://dev-demo/97.7381,0.0326165,22.9885/0,0.967844,0,-0.25155", false)
});
testScript.runTests();
