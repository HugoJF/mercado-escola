<?php

namespace App\Http\Resources;

use App\Actions\Cart\CartCost;
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
        /** @var CartCost $cartCost */
        $cartCost = app(CartCost::class);

        $extra = [
            'products' => ProductResource::collection($this->products),
            'total'    => $cartCost->handle($this->products),
        ];

        return array_merge(
            parent::toArray($request),
            $extra,
        );
    }
}
