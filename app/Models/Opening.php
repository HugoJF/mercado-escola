<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opening extends Model
{
    use HasFactory;

    protected $fillable = [
        'delivery_fee',
        'max_delivery_orders',
        'max_pickup_orders',
        'opens_at',
        'closes_at',
        'delivers_at',
    ];

    protected $dates = ['opens_at', 'closes_at', 'delivers_at'];

    protected $casts = [
        'delivery_fee' => 'float',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function closed()
    {
        return $this->closes_at->isPast();
    }

    public function opened()
    {
        return $this->opens_at->isPast();
    }

    public function scopeActive(Builder $query)
    {
        return $query->where('opens_at', '<', now())
            ->where('closes_at', '>', now());
    }
}
