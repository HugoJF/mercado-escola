<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia;

    protected $fillable = [
        'name',
        'description',
        'quantity_cost',
        'quantity_step',
        'unit_name_singular',
        'unit_name_plural',
    ];

    protected $appends = ['media_links'];

    protected $casts = [
        'quantity_step' => 'float',
        'quantity_cost' => 'float',
    ];

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('optimized')
            ->width(1000)
            ->withResponsiveImages();
    }

    public function getMediaLinksAttribute()
    {
        return $this->media()->get()
            ->keyBy('id')
            ->map(fn(Media $m) => $m->getFullUrl('optimized'))
            ->toArray();
    }

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
        return $this->morphedByMany(Order::class, 'holder', 'has_product')
            ->withPivot('quantity', 'quantity_cost');
    }
}
