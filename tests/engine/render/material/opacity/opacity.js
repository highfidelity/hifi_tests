// Test material matrix
Script.include("../matrix.js?raw=true")

// List here all the entries of the Material Matrix tested in this test
var TEST_CASES = [
    {name:"hifi_opacityV_NormalM_albedoM_ao",  a:0, b:-1, c:-0.5},
    {name:"hifi_opacityM_NormalM_albedoM_ao",  a:0, b:0, c:-0.5},
    {name:"hifi_opacityA_NormalM_albedoM_ao",  a:0, b:1, c:-0.5},
  
    {name:"hifi_opacityV_albedoM_ao",  a:0, b:-1, c:0.5},
];

// Add the test Cases
var createdEntities = addCases(TEST_CASES, true, true)

// clean up after test
Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
});
