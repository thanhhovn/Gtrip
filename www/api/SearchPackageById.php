<?php
        header("Content-Type: application/json", true);
        header("Access-Control-Allow-Origin: *");
        error_reporting(0);
        //echo("Connected to server");
        $ch = curl_init();		
		$baseURL ='gitpackage.com';
		$params = $_GET['id'];
		$id = isset($_GET['id']) ? $_GET['id'] : '';
        echo("From server");
        echo("Id: "+$id);
		$testURL = $baseURL . 'package_api/v1/detail/' . $id;
        echo("</br> Link: "+$test);
            /*
		if (isset($params['locale'])) {
			$testURL .= "&locale={$params['locale']}";
		}*/
		curl_setopt($ch, CURLOPT_URL, $testURL); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY); 
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
		curl_setopt($ch, CURLOPT_USERPWD, 'saleadmin@gitpackage.com:demo123');		
		$json = curl_exec($ch);
		curl_close($ch);
		$package = json_decode($json);

        //echo($json);

?>