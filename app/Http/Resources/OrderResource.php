<?php

namespace App\Http\Resources;

use App\Actions\Cart\ProductCost;
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
        /** @var ProductCost $cartCost */
        $cartCost = app(ProductCost::class);

        $productsCost = $cartCost->handle($this->products);

        $extra = [
            'products'      => ProductResource::collection($this->products),
            'products_cost' => $productsCost,
            'total'         => $productsCost + $this->delivery_fee,
        ];

        return array_merge(
            parent::toArray($request),
            $extra,
        );
    }
}
