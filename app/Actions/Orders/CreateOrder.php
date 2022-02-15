<?php

namespace App\Actions\Orders;

use App\Actions\Openings\FindCurrentOpening;
use App\Exceptions\InvalidCartException;
use App\Exceptions\MaximumDeliveryOrdersReachedException;
use App\Exceptions\MaximumPickupOrdersReachedException;
use App\Exceptions\NoActiveOpeningException;
use App\Mail\OrderCreated;
use App\Models\Opening;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class CreateOrder
{
    protected FindCurrentOpening $currentOpening;

    public function __construct(
        FindCurrentOpening $currentOpening
    )
    {
        $this->currentOpening = $currentOpening;
    }

    public function handle()
    {
        return DB::transaction(fn() => $this->run());
    }

    protected function run()
    {
        /** @var User $user */
        $user = auth()->user();
        $opening = $this->currentOpening->find();

        $this->checkPreconditions($user, $opening);

        $order = $this->createOrder($user, $opening);

        $this->attachProducts($user, $order);
        $this->clearCart($user);
        $this->notifyUser($user, $order);

        return $order;
    }

    /**
     * @param User $user
     */
    protected function clearCart(User $user): void
    {
        $user->products()->detach(
            $user->products->pluck('id')->map(fn($id) => (string)$id)
        );
        $user->cartAddress()->dissociate();
    }

    /**
     * @param User $user
     * @param Order $order
     */
    protected function attachProducts(User $user, Order $order): void
    {
        /*
         * Prepare product list to sync to pivot table.
         * Resulting array should be [product_id] => [pivot_attributes_array]
         */
        $productsData = $user
            ->products
            ->keyBy('id')
            ->map(fn($product) => [
                'quantity' => $product['pivot']['quantity'],
                // quantity_cost is used because it's the price of
                // the product when the user added it to the cart
                'quantity_cost' => $product['pivot']['quantity_cost'],
            ]);
        $order->products()->sync($productsData);
    }

    /**
     * @param User $user
     * @param Order $order
     */
    protected function notifyUser(User $user, Order $order): void
    {
        Mail::to($user)->send(new OrderCreated($order));
    }

    /**
     * @param User $user
     * @param Opening|null $opening
     *
     * @return Order
     */
    protected function createOrder(User $user, Opening $opening): Order
    {
        $order = new Order;

        if ($user->cartAddress) {
            $order->delivery_fee = $opening->delivery_fee;
        }
        $order->state = Order::PENDING;
        $order->address()->associate($user->cartAddress);
        $order->opening()->associate($opening);
        $order->user()->associate($user);

        $order->save();

        return $order;
    }

    /**
     * @param User $user
     * @param Opening|null $opening
     */
    protected function checkPreconditions(User $user, ?Opening $opening): void
    {
        if (!$opening) {
            throw new NoActiveOpeningException;
        }

        if ($user->cartAddress) {
            $pickupOrders = $opening->orders()->whereNull('address_id')->count();
            if ($pickupOrders >= $opening->max_pickup_orders) {
                throw new MaximumPickupOrdersReachedException($opening);
            }
        } else {
            $deliveryOrders = $opening->orders()->whereNotNull('address_id')->count();
            if ($deliveryOrders >= $opening->max_delivery_orders) {
                throw new MaximumDeliveryOrdersReachedException($opening);
            }
        }

        /** @var Collection $cartProducts */
        $cartProducts = $user->products->pluck('id');
        /** @var Collection $openingProducts */
        $openingProducts = $opening->products->pluck('id');

        $diff = $cartProducts->diff($openingProducts);

        if ($diff->count() > 0) {
            throw new InvalidCartException($diff->toArray());
        }
    }
}
