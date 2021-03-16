<?php

namespace App\Exceptions;

use App\Models\Opening;
use Symfony\Component\HttpKernel\Exception\HttpException;

class MaximumPickupOrdersReachedException extends HttpException
{
    public function __construct(Opening $opening) {
        parent::__construct(412, "Opening $opening->id reached maximum pickup orders");
    }
}
