<?php

namespace App\Actions\Orders;

use App\Actions\Openings\FindCurrentOpening;
use App\Exceptions\InvalidCartException;
use App\Exceptions\MaximumDeliveryOrdersReachedException;
use App\Exceptions\MaximumPickupOrdersReachedException;
use App\Exceptions\NoActiveOpeningException;
use App\Exceptions\OrderAlreadyCancelledException;
use App\Exceptions\OrderCannotBeCancelledException;
use App\Mail\OrderCreated;
use App\Models\Opening;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class CancelOrder
{
    public function handle(Order $order)
    {
        if ($order->state === Order::CANCELLED) {
            throw new OrderAlreadyCancelledException($order);
        }

        if ($order->state !== Order::PENDING || $order->opening->closed()) {
            throw new OrderCannotBeCancelledException($order);
        }

        $order->state = Order::CANCELLED;
        $order->save();

        return $order;
    }
}
