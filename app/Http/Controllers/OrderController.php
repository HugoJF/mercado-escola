<?php

namespace App\Http\Controllers;

use App\Exceptions\OrderAlreadyCancelledException;
use App\Exceptions\OrderCannotBeCancelledException;
use App\Http\Requests\OrderStoreRequest;
use App\Http\Resources\OrderResource;
use App\Mail\OrderCreated;
use App\Models\Address;
use App\Models\Opening;
use App\Models\Order;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
        $products = Product::query()->whereIn(
            'id',
            collect($request->input('products'))
                ->map(fn($i) => $i['product_id'])
        )->get()->keyBy('id');

        $productsData = collect($request->input('products'))
            ->keyBy('product_id')
            ->map(fn($product) => [
                'quantity'      => $product['quantity'],
                'quantity_cost' => $products[ $product['product_id'] ]['quantity_cost'],
            ]);
        $order->products()->sync($productsData);

        Mail::to(auth()->user())->send(new OrderCreated($order));

        return new OrderResource($order);
    }

    public function cancel(Order $order)
    {
        if ($order->state === Order::CANCELLED) {
            throw new OrderAlreadyCancelledException($order);
        }

        if (!$order->state !== Order::PENDING || $order->opening->closed()) {
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
