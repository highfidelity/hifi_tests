//
// Created by Nissim Hadar on 2018/3/14
// Copyright 2013-2016 High Fidelity, Inc.
//
// Distributed under the Apache License, Version 2.0.
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

'use strict';

Script.include("./BenchmarkLib.js");

var AVATAR_TRACING_RULES = "" + 
    "trace.*=true\n" +
    "*.detail=true\n" +
    "";

Resources.overrideUrlPrefix(TEST_ROOT, Script.resolvePath(".."));
var testScript = new TestScript();
testScript.addTest({
    name: "benchmarkDevAvatarIsland",
    loader: TestScript.locationLoader("hifi://dev-AvatarIsland.highfidelity.io/14.9,-9.6,25.7/0,1.0,0.0,0.0", 1),
    tracingRules: AVATAR_TRACING_RULES,
    traceActions: TestScript.locationSteps([
        {dt:2, pos:{x:14.9, y:-9.6, z: 25.7}, ori:{yaw:  0   }},
        {dt:2, pos:{x:12.5, y:-8.1, z: -8.9}, ori:{yaw: -58.3}},
        {dt:2, pos:{x:17.8, y:-8.1, z:-10.1}, ori:{yaw: -89.6}},
        {dt:2, pos:{x:22.5, y:-4.7, z: -5.4}, ori:{yaw:  60.9}},
        {dt:2, pos:{x: 9.8, y:-8.3, z: -4.9}, ori:{yaw:112.6 }},
        {dt:2, pos:{x:63.5, y:-2.1, z: 11.2}, ori:{yaw: 72.9 }}        
   ]),
    duration: 12
});



testScript.runTests();

