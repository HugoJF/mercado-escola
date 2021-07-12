<?php

namespace App\Actions\Cart;

use App\Models\Product;
use Illuminate\Support\Collection;

class ProductCost
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

    public function costByUnit(Product $product)
    {
        return $product->pivot->quantity_cost * $product->pivot->quantity;
    }

    public function costByWeight(Product $product)
    {
        $kg = $product->pivot->quantity * $product->weight_increment / 1000;

        return $kg * $product->pivot->quantity_cost;
    }
}
