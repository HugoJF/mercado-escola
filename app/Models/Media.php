<?php

namespace App\Models;

use Spatie\MediaLibrary\MediaCollections\Models\Media as BaseMedia;

class Media extends BaseMedia
{
    public function getUrlAttribute()
    {
        return $this->getFullUrl();
    }
}
