# Manual Performance Test
1. Run interface from command line, providing this script as a parameter.
For example: ` interface --url "hifi://impromedia/-26.4,23.4,-15.6/0,0.0,0.0,1.0" --testScript D:/GitHub/hifi_tests/tests/performance/manualTrace/testManual.js`
1. To create a trace, press the **n** key
1. 20 seconds will be recorded.
1. The file will be in the `~documents\trace` folder, named trace_manualTest_yyyymmdd_hhmm.json.gz (i.e. date_time)
1. In chrome, browse to chrome://tracing/
1. Drag the recorded file into the browser window.