This repository contains a suite of scripts and scenes for benchmarking Interface.

Creating a trace
=========
To use the benchmarking functionality, navigate to the hifi_tests/benchmarks directory, select the desired benchmark script, and run Interface from the command line as follows:

	"%INTERFACE_EXE_PATH%" --testScript "%BENCHMARK_SCRIPT%"

Where %INTERFACE_EXE_PATH% is the path to the interface.exe you want to test, and %BENCHMARK_SCRIPT% is the benchmark you want to run.  For example, to run the manual benchmark, which will add a "toggleTrace" button to your toolbar/tablet, one might type:

	"C:\Program Files\High Fidelity\interface.exe" --testScript manual.js

Similarly, you can benchmark PRs:

	"C:\Program Files\High Fidelity - PR12345\interface.exe" --testScript manual.js

This will create a zipped trace file, likely in your Documents/traces folder.

Viewing a trace
=========
To view a trace, open Chrome and navigate to "chrome://tracing".  Drag and drop the trace file from your files to this tab.  After a few seconds Chrome will display all the activity on every thread captured during the trace.

Adding Profile Ranges
=========
For traces to be useful, you may want to define your own profile ranges.  To do so in a script, use `Script.beginProfileRange("name of your range")` and `Script.endProfileRange("name of your range")`.  For example, [here](https://gist.githubusercontent.com/samcake/d46f49d6d8e5e55d74d0249bb344f90f/raw/408fb97d47308489a0a5fff58f9a9d852b077c6d/handControllerGrab.js) is a version of handControllerGrab.js that uses a few profile ranges.

You can also create profile ranges on the C++ side using the macros defined in [hifi\libraries\shared\src\Profile.h](https://github.com/highfidelity/hifi/blob/master/libraries/shared/src/Profile.h#L93).  Some of these have additional functionality, like setting the profile range color or recording additional information in a payload.