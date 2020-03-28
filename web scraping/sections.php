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

    $data=getSslPage("http://localhost/aabu-schedule-app/web%20scraping/html.html");
    preg_match_all('/<t.*>(.*)<\/t.*>/',$data,$cols);
    $cols=$cols[1];
    require_once('pdo.php');
    $last='000000';
    for ($i=0; $i < count($cols); $i+=12) 
    {
        if(htmlspecialchars($cols[$i])!=htmlspecialchars('&nbsp;'))
        {
            $id=$cols[$i];
            $last=$id;
        }
        else
            $id=$last;
        $course_name=$cols[$i+1];
        $section=$cols[$i+2];
        $hours=$cols[$i+3];
        $start_time=$cols[$i+4];
        $end_time=$cols[$i+5];
        $days=$cols[$i+6];
        $instructor=$cols[$i+7];
        $room=$cols[$i+8];
        $time_days=$start_time.'-'.$end_time.' '.$days;
        //inserting to database
        $sql='INSERT INTO sections(id,name,section,hours,time_days,instructor,room)
        VALUES(:id,:name,:sec,:hours,:t_d,:ins,:room)';
        $stmt=$pdo->prepare($sql);
        $stmt->execute(array(
            ':id'=>$id,
            ':name'=>$course_name,
            ':sec'=>$section,
            ':hours'=>$hours,
            't_d'=>$time_days,
            ':ins'=>$instructor,
            ':room'=>$room
        ));
        //die();
    }
    echo "Database Ready!";
?> 