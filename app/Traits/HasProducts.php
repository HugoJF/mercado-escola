<?php

namespace App\Traits;

use App\Models\Product;

trait HasProducts
{
    public function products()
    {
        return $this->morphToMany(Product::class, 'holder', 'has_product')->withPivot('quantity', 'quantity_cost');
    }
}
