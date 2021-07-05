<?php

namespace App\Actions\Cart;

use App\Models\Product;
use Illuminate\Support\Collection;

class CartCost
{
    public function handle(Collection $products)
    {
        $cost = $products->map(function (Product $product) {
            if ($product->type === 'unit') {
                return $this->costByUnit($product);
            }

            return $this->costByWeight($product);
        })->sum();

        return round($cost, 2);
    }

    protected function costByUnit(Product $product)
    {
        return $product->pivot->quantity_cost * $product->pivot->quantity;
    }

    protected function costByWeight(Product $product)
    {
        $kg = $product->pivot->quantity / 1000;

        return $kg * $product->weight_increment * $product->pivot->quantity_cost;
    }
}
