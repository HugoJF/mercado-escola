<?php

namespace App\Actions\Cart;

use App\Models\Product;
use Illuminate\Support\Collection;

class ProductCost
{
    public function handle(Collection $products)
    {
        $cost = $products->map(function (Product $product) {
            return $product->pivot->quantity_cost * $product->pivot->quantity;
        })->sum();

        return round($cost, 2);
    }
}
