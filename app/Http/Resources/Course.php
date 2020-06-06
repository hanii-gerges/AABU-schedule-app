<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Section;

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
            'hours'=>$this->hours,
            'pre_req'=>$this->pre_req,
            'sections'=>Section::where('course_id',$this->id)->get(),
        ];
    }
}
