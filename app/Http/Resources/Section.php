<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Section extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[
            'lab_id'=>$this->course_id,
            'section_num'=>$this->number,
            'time_days'=>$this->time_days,
            'instructor'=>$this->instructor,
            'room'=>$this->room,
        ];
    }
}
