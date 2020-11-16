<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['address', 'number', 'complement', 'latitude', 'longitude'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isMainAddressOf()
    {
        return $this->hasMany(User::class, 'main_address_id', 'id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
