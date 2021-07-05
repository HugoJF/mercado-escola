<?php

namespace App\Models;

use App\Traits\HasProducts;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/*
 * States:
 * ------
 * PENDING:     Order has been registered;
 * ACCEPTED:    Order has been accepted;
 * READY:       Order is ready to be delivered;
 * SHIPPING:    Order is underway;
 * DELIVERED:   Order has been delivered;
 * CANCELLED:   Order has been canceled by user;
 * REJECTED:    Order has been rejected by admin;
 */

class Order extends Model
{
    use SoftDeletes;
    use HasFactory;
    use HasProducts;

    public const PENDING = 'PENDING';      # Order has been registered;
    public const ACCEPTED = 'ACCEPTED';    # Order has been accepted;
    public const READY = 'READY';          # Order is ready to be delivered;
    public const SHIPPING = 'SHIPPING';    # Order is underway;
    public const DELIVERED = 'DELIVERED';  # Order has been delivered;
    public const CANCELLED = 'CANCELLED';  # Order has been canceled by user;
    public const REJECTED = 'REJECTED';    # Order has been rejected by admin;

    public $incrementing = false;

    public $keyType = 'string';

    protected $with = ['products', 'address'];

    protected $appends = ['total'];

    public function opening()
    {
        return $this->belongsTo(Opening::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function getTotalAttribute()
    {
        return $this->products->reduce(fn ($total, $product) => $total + $product->quantity_cost * $product->pivot->quantity, 0);
    }
}
