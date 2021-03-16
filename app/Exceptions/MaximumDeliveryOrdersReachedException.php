<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Models\Opening;

class MaximumDeliveryOrdersReachedException extends HttpException
{
    public function __construct(Opening $opening)
    {
        parent::__construct(412, "Opening $opening->id reached maximum delivery orders");
    }
}
