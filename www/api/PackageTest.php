<?php 
header("Content-Type: application/json", true);
header("Access-Control-Allow-Origin: *");
    //echo("Access to TestServer");
    //echo("\n");
    error_reporting(0);
        //console.log("Access to PHP");
        $ch = curl_init();
		$baseURL = 'gitpackage.com';//Director::absoluteBaseURL();

	    $params = $_GET['keyword'];
		$keyword = isset($_GET['keyword']) ? $_GET['keyword'] : '';
		$testURL = $baseURL . '/package_api/v1/search/' . "?SearchKey=$keyword";


		if (isset($params['limit'])) {
			$testURL .= "&limit={$params['limit']}";
		}
		curl_setopt($ch, CURLOPT_URL, $testURL); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY); 
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');	
		$json = curl_exec($ch);
		curl_close($ch);
		$packages = json_decode($json);
		
		echo($json);
?>