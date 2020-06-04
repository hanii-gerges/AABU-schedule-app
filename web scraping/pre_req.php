<?php
    function getSslPage($url) 
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_REFERER, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    $data=getSslPage("http://localhost/aabu-schedule-app/web%20scraping/courses_html.html");
    preg_match_all('/<t.*>(.*)<\/t.*>/',$data,$cols);
    $cols=$cols[1];
    echo "<pre>";
    //print_r($cols);
    require_once('pdo.php');
    //die(); 
    try{
        for ($i=0; $i < count($cols); $i+=5) { 
            if($i+4>=count($cols))break;
            $id=trim($cols[$i],'&nbsp;');
            if(strlen($id)>8){$i++;continue;}
            $pre_req=trim($cols[$i+4],' ');
            $pre_req=trim($pre_req,'&nbsp;');
            //echo '<pre>';
            var_dump($pre_req);
            $sql='UPDATE courses SET pre_req=:pre WHERE id=:id';
            $stmt=$pdo->prepare($sql);
            $stmt->execute(array(
                ':pre'=>$pre_req,
                ':id'=>$id
            ));
        }
        echo "Database Ready!";
    }
    catch(Exception $e)
    {
        echo 'Internal Error Occurred!';
    }