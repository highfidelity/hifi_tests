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

var TEST_ROOT = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/";
var TEST_BINARY_ROOT = "https://hifi-public.s3.amazonaws.com/test_scene_data/";
var TEST_SCRIPTS_ROOT = TEST_ROOT + "scripts/";
var TEST_SCENES_ROOT = TEST_ROOT + "scenes/";
var DEFAULT_TRACING_RULES = "trace.*=true\n";

function pad(num, size) {
    var s = num + "";
    while (s.length < size) { s = "0" + s; }
    return s;
}

function formatDate(date) {
    date = date || new Date();
    return date.getFullYear() + pad(date.getMonth() + 1, 2) + pad(date.getDate(), 2) + "_" + pad(date.getHours(), 2) + pad(date.getMinutes(), 2);
}

var TestScript = function (properties) {
    properties = properties || {};
    this.dateString = formatDate();
    this.tests = [];
    return this;
};

TestScript.locationLoader = function (url, position, orientation) {
    return function () {
        print("QQQ going to URL " + url);
        Window.location = url;
        Test.wait(5 * 1000);
        if (!Test.waitForConnection()) {
            return false;
        }
        if (position) {
            MyAvatar.position = position;
        }
        if (orientation) {
            MyAvatar.orientation = orientation;
        }
        Test.waitIdle();
        return true;
    };
};

TestScript.sceneLoader = function (scene, position, orientation) {
    return function () {
        if (!Test.loadTestScene(scene)) {
            return false;
        }
        if (position) {
            MyAvatar.position = position;
        }
        if (orientation) {
            MyAvatar.orientation = orientation;
        }
        Test.waitIdle(10 * 1000);
        return true;
    };
};

TestScript.prototype = {
    addTest: function (test) {
        this.tests.push(test);
    },
    addSceneTest: function (scene) {
        this.addTest({
            name: scene,
            loader: function () {
                Window.location = "127.0.0.0";
                return Test.loadTestScene(scene);
            }
        });
        this.executeTest();
    },
    executeTest: function () {
        print("QQQ executing test " + this.testName);
        var that = this, durationSeconds;
        durationSeconds = this.currentTest.duration || 10;
        this.traceFile = "traces/trace_" + this.testName + "_" + this.dateString + ".json.gz";
        if (!this.loader || !this.loader()) {
            print("QQQ invalid loader");
            this.nextTest();
            return;
        }
        print("QQQ loader complete, beginning trace: " + that.testName);
        Test.startTracing(this.currentTest.tracingRules || DEFAULT_TRACING_RULES);
        Script.setTimeout(function () {
            print("QQQ ending test " + that.testName);
            that.endTest();
        }, durationSeconds * 1000);
    },
    endTest: function () {
        print("QQQ ending test " + this.testName);
        Test.stopTracing(this.traceFile);
        this.nextTest();
    },
    nextTest: function () {
        print("QQQ next test");
        if (0 === this.tests.length) {
            print("QQQ no more tests... exiting");
            Test.quit();
        }
        this.currentTest = this.tests.shift();
        this.testName = this.currentTest.name;
        this.loader = this.currentTest.loader;
        this.executeTest();
    },
    runTests: function () {
        this.nextTest();
    }
};

var AVATAR_TRACING_RULES = "" + 
    "trace.*=false\n" +
    "trace.app=true\n" +
    "trace.simulation.animation=true\n" +
    "";

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));
var testScript = new TestScript();
testScript.addTest({
    name: "dev-chris-1",
    loader: TestScript.locationLoader("dev-chris.highfidelity.io",
                           { x: -22.3544, y: 2.86071, z: 0.221353 },
                           { x: 0, y: -0.793851, z: 0, w: 0.608112 }),
    tracingRules: AVATAR_TRACING_RULES,
    duration: 10
});
testScript.addTest({
    name: "dev-chris-2",
    loader: TestScript.locationLoader("dev-chris.highfidelity.io",
                           { x: 43.3435, y: -0.944245, z: 11.0739 },
                           { x: 0, y: 0.705829, z: 0, w: 0.708382 }),
    tracingRules: AVATAR_TRACING_RULES,
    duration: 10
});
testScript.runTests();
