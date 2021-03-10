<?php

namespace App\Traits;

use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasProducts
{
    /**
     * @return MorphToMany
     */
    public function products()
    {
        return $this->morphToMany(Product::class, 'holder', 'has_product', null, null, 'string_id')
                    ->withPivot('quantity', 'quantity_cost');
    }
}
