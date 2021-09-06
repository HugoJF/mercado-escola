<?php

namespace App\Traits;

use App\Models\AttachedProduct;
use App\Models\HasProduct;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasProducts
{
    public function getStringIdAttribute()
    {
        return (string)$this->id;
    }

    /**
     * @return MorphToMany
     */
    public function products()
    {
        return $this->morphToMany(Product::class, 'holder', 'has_product', null, null, 'string_id')
            ->withPivot('type', 'quantity', 'quantity_cost')
            ->using(HasProduct::class);
    }
}
