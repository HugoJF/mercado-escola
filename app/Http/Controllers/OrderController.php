<?php

namespace App\Http\Controllers;

use App\Actions\Orders\CreateNewOrder;
use App\Exceptions\OrderAlreadyCancelledException;
use App\Exceptions\OrderCannotBeCancelledException;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return OrderResource::collection(auth()->user()->orders()->latest()->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     *
     * @return OrderResource
     * @throws Exception
     */
    public function store(CreateNewOrder $newOrder)
    {
        return new OrderResource($newOrder->create());
    }

    public function cancel(Order $order)
    {
        if ($order->state === Order::CANCELLED) {
            throw new OrderAlreadyCancelledException($order);
        }

        if ($order->state !== Order::PENDING || $order->opening->closed()) {
            throw new OrderCannotBeCancelledException($order);
        }

        $order->state = Order::CANCELLED;
        $order->save();

        return new OrderResource($order);
    }

    /**
     * Display the specified resource.
     *
     * @param Order $order
     *
     * @return OrderResource
     */
    public function show(Order $order)
    {
        $order->loadMissing([
            'address',
            'opening',
            'products',
        ]);

        return new OrderResource($order);
    }

    // TODO: check policies
    public function update(Request $request, Order $order)
    {
        $order->state = $request->input('state');
        $order->save();

        return new OrderResource($order);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Order $order
     *
     * @return Order
     * @throws Exception
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return $order;
    }
}
