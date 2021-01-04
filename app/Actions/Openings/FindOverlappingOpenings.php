<?php

namespace App\Actions\Openings;

use App\Models\Opening;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class FindOverlappingOpenings
{
    /**
     * @param Carbon $opensAt
     * @param Carbon $closesAt
     *
     * @return Opening|null
     */
    public function find(Carbon $opensAt, Carbon $closesAt)
    {
        return Opening::query()
                      ->where(fn(Builder $query) => $query
                          ->where('opens_at', '<', $closesAt)
                          ->where('opens_at', '>', $opensAt)
                      )
                      ->orWhere(fn(Builder $query) => $query
                          ->where('closes_at', '<', $closesAt)
                          ->where('closes_at', '>', $opensAt)
                      )
                      ->first();
    }
}
