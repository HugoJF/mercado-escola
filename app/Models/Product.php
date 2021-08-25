<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia;

    protected $fillable = [
        'name',
        'description',
        'type',
        'quantity_cost',
        'unit_name_singular',
        'unit_name_plural',
        'weight_increment',
    ];

    protected $appends = ['media_links'];



    public function getMediaLinksAttribute()
    {
        /** @var Collection $media */
        $media = $this->getMedia();

        return $media->mapWithKeys(fn(Media $m) => [
            $m->id => $m->getFullUrl('optimized'),
        ])->toArray();
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('optimized')->width(1000);
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
