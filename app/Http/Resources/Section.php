<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\HTTP\Resources\Section as SectionResource;


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
        return [
            'id' => SectionResource::collection($this->id),
            'name' => $this->name,
            'hours'=>$this->hours
        ];
    }
}
