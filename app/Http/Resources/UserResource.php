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

    // TODO: check usages
    protected function calculateCost()
    {
        // TODO: test
        return $this->products->map(function (int $total, Product $product) {
            return $product->pivot->quantity_cost * $product->pivot->quantity;
        })->sum();
    }
}
