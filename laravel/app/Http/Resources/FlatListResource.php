<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FlatListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'project_title' => $this->project?->title,
            'rooms'         => $this->rooms,
            'studio'        => $this->studio,
            'price'         => $this->price,
            'old_price'     => $this->old_price,
            'square'        => $this->square,
            'release_dates' => $this->release_dates,
            'floor'         => $this->floor,
            'image'         => $this->image,
        ];
    }
}
