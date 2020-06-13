<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Course;
use App\Http\Resources\Course as CourseResource;

class CourseController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($major)
    {
        //retrieving courses in a major
        $courses=Course::where('major',$major)->get();
        return CourseResource::collection($courses);
    }
}
