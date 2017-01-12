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

var TEST_IMPORT_URL = "http://mpassets.highfidelity.com/09e75305-8f2a-4ad6-9dd6-d487f1744335-v1/pumpkinPack.svo.json";

function importSVO(importURL) {
    var result = [];
    if (!Entities.canRez() && !Entities.canRezTmp()) {
        Window.notifyEditError(INSUFFICIENT_PERMISSIONS_IMPORT_ERROR_MSG);
        return result;
    }
    
    var position = { x: 0, y: 0.5, z: -3.0 };
    position = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, position));
    var success = Clipboard.importEntities(importURL);
    if (success) {
        result = Clipboard.pasteEntities(position);
    } else {
        Window.notifyEditError("There was an error importing the entity file.");
    }
    return result;
}


var testScript = new TestScript();
var imported = [];
testScript.addTest({
    name: "import_entities",
    duration: 20,
    loader: TestScript.locationLoader("hifi://dev-welcome", true),
    traceActions: function() {
        Script.setTimeout(function () {
            Test.startTraceEvent("entitiesVisible");
            Test.startTraceEvent("entitiesImport");
            imported = importSVO(TEST_IMPORT_URL);
            print("QQQ imported " + imported.length + " entities");
            imported.forEach(function(id) {
                print("QQQ adjusting entity lifetime " + id);
                Entities.editEntity(id, { lifetime: 30 });
            });
            Script.setTimeout(function () { Test.endTraceEvent("entitiesImport"); }, 1000);
        }, 5 * 1000);
        Script.setTimeout(function () {
            Test.startTraceEvent("entitiesDestroy");
            imported.forEach(function(id) {
                print("QQQ deleting entity " + id);
                Entities.deleteEntity(id);
            });
            Script.setTimeout(function () { Test.endTraceEvent("entitiesDestroy"); Test.endTraceEvent("entitiesVisible"); }, 1000);
        }, 15 * 1000);
    },
});
testScript.runTests();
