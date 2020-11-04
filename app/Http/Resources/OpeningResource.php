<?php

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\JsonResource;

class OpeningResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        /** @var Collection $orders */
        $orders = $this->orders;

        $pickupCount = $orders->where('address_id', null)->count();

        return array_merge(
            parent::toArray($request),
            [
                'products' => ProductResource::collection($this->products),
                'pickup_count' => $pickupCount,
                'delivery_count' => $orders->count() - $pickupCount,
            ]
        );
    }
}
