var test = Script.require("./test.js?raw=true");
test.test("auto");

// Check every second if the test is complete
var testTimer = Script.setInterval(
    function() {
        if (test.complete) {
            Window.alert("Tests have been completed");
            Script.stop();
        }
    },

    1000
);
