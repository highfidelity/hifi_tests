// Test material matrix
Script.include("../matrix.js?raw=true")

// List here all the entries of the Material Matrix tested in this test
var TEST_CASES = [
    {name:"hifi_roughnessV00_albedoV_ao",  a:0, b:-2, c:-0.5},
    {name:"hifi_roughnessV25_albedoV_ao",  a:0, b:-1, c:-0.5},
    {name:"hifi_roughnessV50_albedoV_ao",  a:0, b:0, c:-0.5},
    {name:"hifi_roughnessV75_albedoV_ao",  a:0, b:1, c:-0.5},
    {name:"hifi_roughnessV100_albedoV_ao",  a:0, b:2, c:-0.5},
  
    {name:"hifi_roughnessV00_metallicV_albedoV_ao",  a:0, b:-2, c:0.5},
    {name:"hifi_roughnessV25_metallicV_albedoV_ao",  a:0, b:-1, c:0.5},
    {name:"hifi_roughnessV50_metallicV_albedoV_ao",  a:0, b:0, c:0.5},
    {name:"hifi_roughnessV75_metallicV_albedoV_ao",  a:0, b:1, c:0.5},
    {name:"hifi_roughnessV100_metallicV_albedoV_ao",  a:0, b:2, c:0.5},
];

// Add the test Cases
var createdEntities = addCases(TEST_CASES)

// clean up after test
Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
});
