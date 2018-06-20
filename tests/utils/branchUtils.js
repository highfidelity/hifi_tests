// Returns the `autoTester.js` version on the branch we are executing from
createAutoTester = function (executionPath) {
    var user = "highfidelity";
    var repository = "hifi_tests";
    
    // Find the execution branch
    var branch = "branch not found";
    var words = executionPath.split("/");

    if (words[0] !== "https:") {
        // This will occur when running locally
        branch = "master";
    } else {
        // branch is inbetween the repository name and the "tests" folder
        for (var i = 0; i < words.length - 2; ++i) {
            if (words[i] === repository && words[i + 2] === "tests") {
                branch = words[i + 1];
                break;
            }
        }
    }

    var repoPath = "https://github.com/" + user + "/" + repository + "/blob/" + branch;
    return Script.require(repoPath + "/tests/utils/autoTester.js?raw=true");
}
