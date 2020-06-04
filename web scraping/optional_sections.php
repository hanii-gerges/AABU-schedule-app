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
            if(strlen($id)==0)$id=$last;
            else $last=$id;
            $num=trim($cols[$i+2],' &nbsp;');
            $start_time=trim($cols[$i+4],' &nbsp;');
            $end_time=trim($cols[$i+5],' &nbsp;');
            $days=trim($cols[$i+6],' &nbsp;');
            $instructor=trim($cols[$i+7],' &nbsp;');
            $room=trim($cols[$i+8],' &nbsp;');
            $time_days=$start_time.'-'.$end_time.' '.$days;
            // echo var_dump($id);
            // echo $num.'<br>';
            // echo $start_time.'<br>';
            // echo $end_time.'<br>';
            // echo $days.'<br>';
            // echo $instructor.'<br>';
            // echo $room.'<br>';
            // echo '<br>';

            //inserting to database
            $sql='INSERT INTO sections
            VALUES(:cid,:num,:t_d,:ins,:room)';
            $stmt=$pdo->prepare($sql);
            $stmt->execute(array(
                ':cid'=>$id,
                ':num'=>$num,
                't_d'=>$time_days,
                ':ins'=>$instructor,
                ':room'=>$room
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