$client = new-object System.Net.WebClient
$client.DownloadFile("http://builds.highfidelity.com/HighFidelity-Beta-8293.exe", "Hifi-Installer.exe")
$client.DownloadFile("http://highfidelity.com/dev-builds.xml", "dev-builds.xml")