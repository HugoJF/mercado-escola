<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia;

    protected $fillable = ['name', 'description', 'quantity_type', 'quantity_cost'];

    public function openings()
    {
        return $this->belongsToMany(Opening::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }
}
