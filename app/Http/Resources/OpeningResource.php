<?php

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\JsonResource;

class OpeningResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        if ($this->resource) {
            /** @var Collection $orders */
            $orders = $this->orders;

            $pickupCount = $orders->whereNull('address_id')->count();
            $orderCount = $orders->count();

            $extra = [
                'products'       => ProductResource::collection($this->products),
                'pickup_count'   => $pickupCount,
                'delivery_count' => $orderCount - $pickupCount,
            ];
        } else {
            $extra = [];
        }

        return array_merge(
            parent::toArray($request),
            $extra
        );
    }
}
