// Find the GitHub branch we are running from
getBranch = function (path, repository) {
    print("==========================================", path);
    console.warn("==========================================", path);
    // The branch is the word after the repository name, and before the word "tests"
    // Assumes that the branch exists in the path

    // Note that the repository includes a final '/'
    var repositoryName = repository.slice(0,-1);

    var words = path.split("/");

    // If the first word is not "https" then the script is probably running from a local file
    // In this case, assume the required branch is "master"
    if (words[0] !== "https") {
        return "master";
    }

    for (var i = 0; i < words.length - 2; ++i) {
        if (words[i] === repositoryName && words[i + 2] === "tests") {
            return words[i + 1];
        }
    }

    // This should never happen
    return "branch not found";
}
