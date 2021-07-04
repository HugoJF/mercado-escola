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
        $extra = [
            'products' => ProductResource::collection($this->products),
            'total'    => round($this->orderCost()),
        ];

        return array_merge(
            parent::toArray($request),
            $extra,
        );
    }

    protected function orderCost()
    {
        return $this->products->map(function (Product $product) {
            if ($product->type === 'unit') {
                return $this->byUnit($product);
            }

            return $this->byWeight($product);
        })->sum();
    }

    protected function byUnit(Product $product)
    {
        return $product->pivot->quantity_cost * $product->pivot->quantity;
    }

    protected function byWeight(Product $product)
    {
        return $product->pivot->quantity * $product->weight_increment * $product->pivot->quantity_cost / 1000;
    }
}
