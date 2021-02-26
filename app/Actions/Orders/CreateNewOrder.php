<?php

namespace App\Actions\Orders;

use App\Actions\Openings\FindCurrentOpening;
use App\Mail\OrderCreated;
use App\Models\Address;
use App\Models\Opening;
use App\Models\Order;
use App\Models\User;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class CreateNewOrder
{
    protected FindCurrentOpening $currentOpening;

    public function __construct(
        FindCurrentOpening $currentOpening
    ) {
        $this->currentOpening = $currentOpening;
    }

    public function create()
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
        $user->products()->sync([]);
        $user->cartAddress()->dissociate();
    }

    /**
     * @param User  $user
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
                'quantity'      => $product['pivot']['quantity'],
                'quantity_cost' => $product->quantity_cost,
            ]);
        $order->products()->sync($productsData);
    }

    /**
     * @param User  $user
     * @param Order $order
     */
    protected function notifyUser(User $user, Order $order): void
    {
        Mail::to($user)->send(new OrderCreated($order));
    }

    /**
     * @param User         $user
     * @param Opening|null $opening
     *
     * @return Order
     */
    protected function createOrder(User $user, Opening $opening): Order
    {
        $order = new Order;

        $order->state = Order::PENDING;
        $order->address()->associate($user->cartAddress);
        $order->opening()->associate($opening);
        $order->user()->associate($user);

        $order->save();

        return $order;
    }

    /**
     * @param User         $user
     * @param Opening|null $opening
     *
     * @throws Exception
     */
    protected function checkPreconditions(User $user, ?Opening $opening): void
    {
        if (!$opening) {
            throw new Exception('There are no active openings right now');
        }

        if ($opening->closed()) {
            throw new Exception('Opening is closed');
        }

        if ($user->cartAddress) {
            $pickupOrders = $opening->orders()->whereNull('address_id')->count();
            if ($pickupOrders >= $opening->max_pickup_orders) {
                throw new Exception('Opening reached max pickup orders');
            }
        } else {
            $deliveryOrders = $opening->orders()->whereNotNull('address_id')->count();
            if ($deliveryOrders >= $opening->max_delivery_orders) {
                throw new Exception('Opening reached max delivery orders');
            }
        }

        /** @var Collection $cartProducts */
        $cartProducts = $user->products->pluck('id');
        /** @var Collection $openingProducts */
        $openingProducts = $opening->products->pluck('id');

        $diff = $cartProducts->diff($openingProducts);

        if ($diff->count() > 0) {
            throw new Exception('Cart contains products that are not available in this opening: ' . $diff->join(', '));
        }
    }
}
