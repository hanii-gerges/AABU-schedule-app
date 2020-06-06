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

    $data=getSslPage("http://localhost/aabu-schedule-app/web%20scraping/cis_html.html");
    preg_match_all('/<t.*>(.*)<\/t.*>/',$data,$cols);
    $cols=$cols[1];
    //  echo '<pre>';
    //  print_r($cols);
    require_once('pdo.php');
    try{
        for ($i=0; $i < count($cols); $i+=5) 
        {
            $id=trim($cols[$i],' &nbsp;');
            $name=trim($cols[$i+1],' &nbsp;');
            $hours=trim($cols[$i+2],' &nbsp;');
            $pre_req=trim($cols[$i+4],' &nbsp;');
            // echo $id.'<br>';
            // echo $name.'<br>';
            // echo $hours.'<br>';
            // echo var_dump($pre_req).'<br>';
            // echo '<br>';

            //inserting to database
            $sql='INSERT INTO courses
            VALUES(:cid,:name,:hours,:pr,"cis")';
            $stmt=$pdo->prepare($sql);
            $stmt->execute(array(
                ':cid'=>$id,
                ':name'=>$name,
                ':hours'=>$hours,
                ':pr'=>$pre_req
            ));
            
            //die();
        }
        echo "Database Ready!";
    }
    catch(Exception $e)
    {
        echo 'Internal Error Occurred!';
    }
?> 