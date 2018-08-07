$client = new-object System.Net.WebClient
$client.DownloadFile("http://builds.highfidelity.com/HighFidelity-Beta-latest-dev.exe", "HighFidelity-Beta-latest-dev.exe")
$client.DownloadFile("http://highfidelity.com/dev-builds.xml", "dev-builds.xml")