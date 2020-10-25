<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderStoreRequest;
use App\Http\Resources\OrderResource;
use App\Models\Address;
use App\Models\Opening;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return OrderResource::collection(auth()->user()->orders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function store(OrderStoreRequest $request)
    {
        $opening = Opening::query()
                          ->findOrFail($request->input('opening_id'));

        $address = Address::query()
                          ->find($request->input('address_id'));

        $order = new Order;

        $order->state = Order::PENDING;
        $order->address()->associate($address);
        $order->opening()->associate($opening);
        $order->user()->associate(auth()->user());

        $order->save();

        /*
         * Prepare product list to sync to pivot table.
         * Resulting array should be [product_id] => [pivot_attributes_array]
         */
        $products = collect($request->input('products'))
            ->keyBy('product_id')
            ->map(fn($product) => [
                'quantity' => $product['quantity'],
            ]);
        $order->products()->sync($products);

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
