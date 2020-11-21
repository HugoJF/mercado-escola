<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
        return array_merge(
            parent::toArray($request),
            [
                'products' => ProductResource::collection($this->products),
                'cost' => $this->calculateCost(),
            ]
        );
    }

    protected function calculateCost()
    {
        return $this->products->reduce(function (int $total, Product $product) {
            return $total + $product->quantity_cost * $product->pivot->quantity;
        }, 0);
    }
}
