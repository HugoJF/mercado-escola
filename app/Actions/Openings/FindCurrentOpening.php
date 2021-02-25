<?php

namespace App\Actions\Openings;

use App\Exceptions\OverlappingOpeningException;
use App\Models\Opening;
use Illuminate\Support\Collection;

class FindCurrentOpening
{
    /**
     * @return Opening|null
     */
    public function find()
    {
        /** @var Collection $openings */
        $openings = Opening::active()->get();

        if ($openings->count() > 1) {
            throw new OverlappingOpeningException;
        }

        if ($openings->isEmpty()) {
            return null;
        }

        return $openings->first();
    }
}
