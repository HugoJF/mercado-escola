<?php

namespace App\Http\Controllers;

use App\Actions\Orders\CancelOrder;
use App\Actions\Orders\CreateNewOrder;
use App\Http\Requests\OrderUpdateRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Exception;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Order::class);
    }

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
     * @param CreateNewOrder $createNewOrder
     *
     * @return OrderResource
     */
    public function store(CreateNewOrder $createNewOrder)
    {
        return new OrderResource($createNewOrder->handle());
    }

    /**
     * @param CancelOrder $cancelOrder
     * @param Order       $order
     *
     * @return OrderResource
     */
    public function cancel(CancelOrder $cancelOrder, Order $order)
    {
        return new OrderResource($cancelOrder->handle($order));
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

    public function update(OrderUpdateRequest $request, Order $order)
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
