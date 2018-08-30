DEFAULT_TRACING_RULES = "" +
    "trace.*=true\n" +
    "*.detail=false\n" +
    "";

// Creates a string of length 'size' from the number 'num'
// the resulting string is left-padded as needed with '0'
function pad(num, size) {
    var s = num + "";
    while (s.length < size) {
        s = "0" + s; 
    }
    
    return s;
}

// Returns the current data and time as a string in the following format:
//    yyyymmdd_hhmm
function formatDate(date) {
    date = new Date();
    return date.getFullYear() + pad(date.getMonth() + 1, 2) + pad(date.getDate(), 2) + "_" + 
    pad(date.getHours(), 2) + pad(date.getMinutes(), 2) + pad(date.getSeconds(), 2);
}

// Create a trace file when the advance key is pressed
var advanceKey = "n";
var testTime_secs = 20;
var onKeyPressEventNextStep = function (event) {
    if (String.fromCharCode(event.key) == advanceKey.toUpperCase()) {
		var dateString = formatDate();
		var testName = "manualTest";
		var traceFile = "traces/trace_" + testName + "_" + dateString + ".json.gz";

		Window.displayAnnouncement("Starting test - please wait " + testTime_secs + " seconds");
		Test.startTracing(DEFAULT_TRACING_RULES);
		
		Test.wait(testTime_secs * 1000);
		
		Test.stopTracing(traceFile);
		Window.displayAnnouncement("Test complete, file " + traceFile + " has been created");
    }
}

// Connect the key event
Controller.keyPressEvent.connect(onKeyPressEventNextStep);
