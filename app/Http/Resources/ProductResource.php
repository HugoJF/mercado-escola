<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductResource extends JsonResource
{
    public $preserveKeys = true;

    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        /** @var Collection $media */
        $media = $this->getMedia();

        return array_merge(
            parent::toArray($request),
            [
                'media' => $media->mapWithKeys(fn(Media $m) => [
                    $m->id => $m->getFullUrl()
                ])->toArray(),
            ]
        );
    }
}
