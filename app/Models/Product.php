<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = ['title', 'description', 'quantity_type', 'quantity_cost'];

    public function openings()
    {
        return $this->belongsToMany(Opening::class);
    }
}
