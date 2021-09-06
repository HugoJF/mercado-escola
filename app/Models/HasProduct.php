<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphPivot;

class HasProduct extends MorphPivot
{
    protected $casts = [
        'quantity' => 'float',
        'quantity_cost' => 'float',
    ];
}
