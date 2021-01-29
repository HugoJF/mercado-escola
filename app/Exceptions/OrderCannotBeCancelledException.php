<?php

namespace App\Exceptions;

use App\Models\Order;
use Symfony\Component\HttpKernel\Exception\HttpException;

class OrderCannotBeCancelledException extends HttpException
{
    public function __construct(Order $order)
    {
        parent::__construct(412, "Order $order->id cannot be cancelled anymore (opening is closed).");
    }
}
