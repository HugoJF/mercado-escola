<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
        return parent::toArray($request);
    }

    protected function calculateCost()
    {
        return $this->products->reduce(function (int $total, Product $product) {
            return $total + $product->quantity_cost * $product->pivot->quantity;
        }, 0);
    }
}
