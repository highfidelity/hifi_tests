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

var TEST_IMPORT_URL = "http://mpassets.highfidelity.com/816d3dbd-5f8d-47d9-a7c4-2b00b067aa2a-v1/EZ-Duz-It-Blocks-vol-1.svo.json";

function importSVO(importURL) {
    if (!Entities.canRez() && !Entities.canRezTmp()) {
        Window.notifyEditError(INSUFFICIENT_PERMISSIONS_IMPORT_ERROR_MSG);
        return;
    }

    var success = Clipboard.importEntities(importURL);
    if (success) {
        var VERY_LARGE = 10000;
        var position = {
            x: 0,
            y: 0,
            z: 0
        };
        if (Clipboard.getClipboardContentsLargestDimension() < VERY_LARGE) {
            position = MyAvatar.position;
        }
        if (position !== null && position !== undefined) {
            var pastedEntityIDs = Clipboard.pasteEntities(position);
        } else {
            Window.notifyEditError("Can't import objects: objects would be out of bounds.");
        }
    } else {
        Window.notifyEditError("There was an error importing the entity file.");
    }
}

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
            Script.setTimeout(function () { Test.endTraceEvent("tabletLoad"); print("QQQ end trace event"); }, 1000);
        }, 10 * 1000);
        Script.setTimeout(function () {
            Test.startTraceEvent("tabletUnload");
            webTablet.destroy();
            Script.setTimeout(function () { 
                Test.endTraceEvent("tabletUnload"); 
                Test.endTraceEvent("tabletVisible");
            }, 1000);
        }, 15 * 1000);
/*
        // move to a different script and ensure that we delete whatever we import before the end of the script
        Script.setTimeout(function () {
            print("QQQ Importing content from " + TEST_IMPORT_URL);
            Test.startTraceEvent("importContent");
            importSVO(TEST_IMPORT_URL);
            print("QQQ done importing content from " + TEST_IMPORT_URL);
            Script.setTimeout(function () { Test.endTraceEvent("importContent"); }, 200);
        }, 18 * 1000);
*/        
    },
});
testScript.runTests();
