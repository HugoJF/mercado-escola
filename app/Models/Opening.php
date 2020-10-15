<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opening extends Model
{
    use HasFactory;

    protected $fillable = ['enabled_at', 'opens_at', 'max_delivery_orders', 'max_pickup_orders', 'closes_at'];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
