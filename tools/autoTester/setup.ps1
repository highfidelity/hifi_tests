$client = new-object System.Net.WebClient
$client.DownloadFile("https://hifi-content.s3.amazonaws.com/nissim/autoTester/Release.exe", "Release.exe")
