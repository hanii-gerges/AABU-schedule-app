<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Section;
use App\Http\Resources\Section as SectionResource;


class Course extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'pre_req'=>$this->pre_req,
            'sections'=>Section::where('course_id',$this->id)->get(),
            'lab_sections'=>Section::where('course_id',$this->id.'00')->get(),
        ];
    }
}
