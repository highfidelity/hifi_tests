//
// Created by Nissim Hadar on 2018/3/14
// Copyright 2013-2016 High Fidelity, Inc.
//
// Distributed under the Apache License, Version 2.0.
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

'use strict';

Script.include("../BenchmarkLib.js");

var AVATAR_TRACING_RULES = "" + 
    "trace.*=true\n" +
    "*.detail=true\n" +
    "";

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));
var testScript = new TestScript();
testScript.addTest({
    name: "benchmarkDevAvatarIsland",
    loader: TestScript.locationLoader("hifi://dev-AvatarIsland.highfidelity.io/14.9,-9.6,25.7/0,1.0,0.0,0.0", 1, null, null, 60),
    tracingRules: AVATAR_TRACING_RULES,
    traceActions: TestScript.locationSteps([
        {dt:6, pos:{x:14.9, y:-9.6, z: 25.7}, ori:{yaw:  0   }}     
   ]),
    duration: 6
});



testScript.runTests();

