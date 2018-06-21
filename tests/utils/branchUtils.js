//Locate the "tests" folder ,returns the path including "tests"
getRepositoryPath = function (executionPath) {
    var words = executionPath.split("/");

    var repositoryPath = "";
    for (var i = 0; i < words.length; ++i) {
        repositoryPath += words[i] + "/";
        if (words[i] === "tests") {
            break;
        }
    }

    return repositoryPath;
}

// Returns the `autoTester.js` version on the branch we are executing from
createAutoTester = function (executionPath) {
    // Default values
    var user = "highfidelity";;
    var repository = "hifi_tests";
    var branch = "master";
    
    // The format of the execution path is as follows (assuming the test is in the "tests' folder hierarchy)
    // "https://raw.githubusercontent.com/<user>/<repository>/<branch>/tests/..."
    // If the first word is not "https" then the script is probably running from a local file
    var words = executionPath.split("/");

    if (words[0] === "https:" && words.length >= 6) {
        // Note that words[1] is null and words[2] is "raw.githubusercontent.com"
        user = words[3];
        repository = words[4];
        branch = words[5];
    }

    // This needs to work for both 'https://' and 'file://' URLs
    var repositoryPath = getRepositoryPath(executionPath);

    var autoTester =  Script.require(repositoryPath + "utils/autoTester.js");
    autoTester.setRepositoryInfo(user, repository, branch, repositoryPath);

    return autoTester;
}
