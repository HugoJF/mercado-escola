<?php

namespace App\Actions\Openings;

use App\Exceptions\OverlappingOpeningException;
use App\Models\Opening;
use Carbon\Carbon;

class CreateNewOpening
{
    protected FindOverlappingOpenings $overlappingOpenings;

    public function __construct(
        FindOverlappingOpenings $overlappingOpenings
    ) {
        $this->overlappingOpenings = $overlappingOpenings;
    }

    public function handle(array $data)
    {
        $opensAt = Carbon::parse($data['opens_at']);
        $closesAt = Carbon::parse($data['closes_at']);

        $overlap = $this->overlappingOpenings->find($opensAt, $closesAt);

        if ($overlap) {
            // TODO: this should become an ErrorBag/ValidationException
            throw new OverlappingOpeningException;
        }

        $opening = new Opening($data);
        $opening->save();

        return $opening;
    }
}
