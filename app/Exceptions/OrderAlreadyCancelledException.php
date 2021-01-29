<?php

namespace App\Exceptions;

use App\Models\Order;
use Symfony\Component\HttpKernel\Exception\HttpException;

class OrderAlreadyCancelledException extends HttpException
{
    public function __construct(Order $order)
    {
        parent::__construct(412, "Order $order->id is already cancelled.");
    }
}
