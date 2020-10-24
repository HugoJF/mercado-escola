<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opening extends Model
{
    use HasFactory;

    protected $fillable = [
        'enabled_at',
        'opens_at',
        'max_delivery_orders',
        'max_pickup_orders',
        'closes_at',
        'delivers_at'
    ];

    protected $dates = ['enabled_at', 'opens_at', 'closes_at', 'delivers_at'];

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

    public function enabled()
    {
        return $this->enabled_at->isPast();
    }
}
