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
Script.include("/~/system/libraries/WebTablet.js");

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));

var testScript = new TestScript();
var webTablet;
print("QQQ starting test script");
testScript.addTest({
    name: "marketplace",
    duration: 20,
    loader: TestScript.locationLoader("hifi://dev-welcome", true),
    traceActions: function() {
        Script.setTimeout(function () {
            Test.startTraceEvent("tabletVisible");
            Test.startTraceEvent("tabletLoad");
            webTablet = new WebTablet("https://metaverse.highfidelity.com/marketplace", null, null, true);
            Script.setTimeout(function () { 
                Test.endTraceEvent("tabletLoad"); 
            }, 1000);
        }, 10 * 1000);
        Script.setTimeout(function () {
            Test.startTraceEvent("tabletUnload");
            webTablet.destroy();
            Script.setTimeout(function () { 
                Test.endTraceEvent("tabletUnload"); 
                Test.endTraceEvent("tabletVisible");
            }, 1000);
        }, 15 * 1000);
    },
});
testScript.runTests();
