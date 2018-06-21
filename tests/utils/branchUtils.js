var user = "highfidelity";
var repository = "hifi_tests";

// Find the GitHub branch we are running from
getBranch = function (executionPath) {
    // The branch is the word after the repository name, and before the word "tests"
    // Assumes that the branch exists in the executionPath
    var words = executionPath.split("/");

    // If the first word is not "https" then the script is probably running from a local file
    // In this case, assume the required branch is "master"
    if (words[0] !== "https:") {
        return "master";
    }

    for (var i = 0; i < words.length - 2; ++i) {
        if (words[i] === repository && words[i + 2] === "tests") {
            return words[i + 1];
        }
    }

    // This should never happen
    return "branch not found";
}

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
    var repositoryPath = getRepositoryPath(executionPath);
    var branch = getBranch(executionPath);

    var autoTester =  Script.require(repositoryPath + "utils/autoTester.js");
    autoTester.setRepositoryPathAndBranch(repositoryPath, branch);

    return autoTester;
}
