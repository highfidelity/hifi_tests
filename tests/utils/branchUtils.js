// Locate the "repository" folder ,returns the path up to, but not including, "tests"
// Note that the result includes the final '/'
getRepositoryPath = function (executionPath) {
    var words = executionPath.split("/");

    var repositoryPath = "";
    for (var i = 0; i < words.length; ++i) {
        if (words[i] === "tests") {
            break;
        }
        repositoryPath += words[i] + "/";
    }

    return repositoryPath;
}

// Returns the `autoTester.js` version on the branch we are executing from
createAutoTester = function (executionPath) {
    // Default values
    var user = "highfidelity";;
    var branch = "master";

    // The format of the execution path is either (assuming the test is in the "tests' folder hierarchy)
    //      "https://raw.githubusercontent.com/<user>/<repository>/<branch>/tests/..."
    // or
    //      "https://github.com/<user>/blob/<repository>/<branch>/tests/..."
    //
    // If the first word is not "https" then the script is probably running from a local file
    var words = executionPath.split("/");

    if (words[0] === "https:") {
        // Note that words[1] is null
        user = words[3];

        if (words[2] === "raw.githubusercontent.com") {
            branch = words[5];
        } else {
            // The second format has the 'blob' token
            branch = words[6];
        }
    }

    var repositoryPath = getRepositoryPath(executionPath);
    var autoTesterPath = repositoryPath + "tests/utils/autoTester.js";

    // For the second format we need to append "?raw=true" to the path
    if (words[2] === "github.com") {
        autoTesterPath = autoTesterPath + "?raw=true";
    }

    var autoTester =  Script.require(autoTesterPath);
    autoTester.setRepositoryInfo(repositoryPath);

    return autoTester;
}
