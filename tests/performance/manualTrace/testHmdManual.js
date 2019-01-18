DEFAULT_TRACING_RULES = "" +
    "trace.*=true\n" +
    "*.detail=true\n" +
    "";
var count=1;
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var buttonStart = tablet.addButton({
    text: "Start Trace"
});

buttonStart.clicked.connect(function () {
	Window.displayAnnouncement("Starting test - please wait");
	Test.startTracing(DEFAULT_TRACING_RULES);
});

var buttonStop = tablet.addButton({
    text: "Stop Trace"
});

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
//    yyyymmdd_hhmmss
function formatDate(date) {
    date = new Date();
    return date.getFullYear() + pad(date.getMonth() + 1, 2) + pad(date.getDate(), 2) + "_" + 
    pad(date.getHours(), 2) + pad(date.getMinutes(), 2) + pad(date.getSeconds(), 2);
}

buttonStop.clicked.connect(function ()
 {
    Window.displayAnnouncement("Stop test - please wait ");
    var dateString =count++;
    var traceFile = "/sdcard/traces/trace_" + dateString;
	Test.stopTracing(traceFile);
});