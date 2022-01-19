<?php

namespace App\GraphQL\Queries;

use App\Actions\Openings\FindCurrentOpening;

class CurrentOpening
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        /** @var FindCurrentOpening $currentOpening */
        $currentOpening = app(FindCurrentOpening::class);

        return $currentOpening->find();
    }
}
