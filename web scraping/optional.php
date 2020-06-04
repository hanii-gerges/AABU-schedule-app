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

    $data=getSslPage("http://localhost/aabu-schedule-app/web%20scraping/optional_html.html");
    preg_match_all('/<t.*>(.*)<\/t.*>/',$data,$cols);
    $cols=$cols[1];
    require_once('pdo.php');
    // echo "<pre>";
    // print_r($cols);
    $last='000000';
    try{
        for ($i=0; $i < count($cols); $i+=12) 
        {

            // defining culomns
            // may accurr the 2 types of spaces so trim all
            $id=trim($cols[$i],' &nbsp;');
            if(strlen($id)==0)continue;
            $name=trim($cols[$i+1],' &nbsp;');
            $hours=trim($cols[$i+3],' &nbsp;');
            // echo var_dump($id);
            // echo $name.'<br>';
            // echo $hours.'<br>';
            // echo '<br>';

            //inserting to database
            $sql='INSERT INTO courses
            VALUES(:cid,:name,:hours,"","optional")';
            $stmt=$pdo->prepare($sql);
            $stmt->execute(array(
                ':cid'=>$id,
                ':name'=>$name,
                ':hours'=>$hours,
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