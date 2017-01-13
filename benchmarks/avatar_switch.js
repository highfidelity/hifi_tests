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

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));

var DEFAULT_AVATAR_URL = "http://mpassets.highfidelity.com/f14bf7c9-49a1-4249-988a-0a577ed78957-v1/beingOfLight.fst";
var TEST_AVATAR_URL = "http://mpassets.highfidelity.com/b4502145-15eb-4023-b7d6-a81c5cbf6abf-v1/F_FitTra.fst";

MyAvatar.skeletonModelURL = DEFAULT_AVATAR_URL;
var testScript = new TestScript();
testScript.addTest({
    name: "avatar_switch",
    duration: 20,
    loader: TestScript.locationLoader("hifi://dev-welcome", true),
    traceActions: function() {
        Script.setTimeout(function () {
            Test.startTraceEvent("avatarChange");
            MyAvatar.skeletonModelURL = TEST_AVATAR_URL;
            Script.setTimeout(function () { Test.endTraceEvent("avatarChange"); }, 1000);
        }, 5 * 1000);
        Script.setTimeout(function () {
            Test.startTraceEvent("avatarChange");
            MyAvatar.skeletonModelURL = DEFAULT_AVATAR_URL;
            Script.setTimeout(function () { Test.endTraceEvent("avatarChange"); }, 1000);
        }, 15 * 1000);
    },
});
testScript.runTests();
