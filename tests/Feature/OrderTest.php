<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Opening;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use DatabaseTransactions;

    public function test_order_products_relationship()
    {
        /** @var Product $product1 */
        $product1 = Product::factory()->create();
        /** @var Product $product2 */
        $product2 = Product::factory()->create();

        /** @var Order $order */
        $order = Order::factory()->create();

        $order->products()->attach($product1, [
            'amount'      => 2,
            'quantity_cost' => 2,
        ]);
        $order->products()->attach($product2, [
            'amount'      => 5,
            'quantity_cost' => 5,
        ]);

        $this->assertEquals(collect([
            $product1->toArray(),
            $product2->toArray(),
        ])->pluck('id'), $order->products->pluck('id'));
    }

    public function test_order_index_shows_user_orders()
    {
        $this->loginAsUser();

        Order::factory([
            'user_id' => auth()->id(),
        ])->hasAttached(
            Product::factory()->count(5),
            ['amount' => 5, 'quantity_cost' => 5]
        )->create();

        $this->get(route('orders.index'))
             ->assertStatus(200)
             ->assertJsonCount(1, 'data');
    }

    public function test_order_show()
    {
        $this->loginAsUser();

        $order = Order::factory([
            'user_id' => auth()->id(),
        ])->hasAttached(
            Product::factory()->count(5),
            ['amount' => 5, 'quantity_cost' => 5]
        )->create();

        $this->get(route('orders.show', $order))
             ->assertStatus(200)
             ->assertJsonCount(5, 'data.products');
    }

    public function test_order_store()
    {
        $this->loginAsUser();

        /** @var User $user */
        $user = auth()->user();
        /** @var Address $address */
        $address = Address::factory(['user_id' => $user])->create();
        /** @var Collection $products */
        $products = Product::factory()->count(5)->create();
        /** @var Opening $opening */
        $opening = Opening::factory([
            'opens_at'            => now()->subDays(2),
            'closes_at'           => now()->addDay(),
            'max_delivery_orders' => 50,
            'max_pickup_orders'   => 50,
        ])->create();

        $opening->products()->sync($products->pluck('id'));

        $user->cartAddress()->associate($address);
        $user->products()->sync($products->keyBy('id')->map(fn($id) => [
            'amount'      => 5,
            'quantity_cost' => 30,
        ]));

        $response = $this->post(route('orders.store'), [], [
            // Avoid redirects and just return error bag
            'Accept' => 'application/json',
        ]);

        // Assert order was created
        $response->assertStatus(201);
        $this->assertDatabaseHas('orders', [
            'id'         => $response->json('data.id'),
            'opening_id' => $opening->id,
            'user_id'    => $user->id,
            'address_id' => $address->id,
        ]);

        // Assert products were attached
        $order = Order::query()->find($response->json('data.id'));
        $this->assertEquals(
            $products->pluck('id'),
            $order->products->pluck('id')
        );
    }

    public function test_order_will_not_be_created_if_cart_is_invalid()
    {
        $this->loginAsUser();

        /** @var User $user */
        $user = auth()->user();
        /** @var Address $address */
        $address = Address::factory(['user_id' => $user])->create();
        /** @var Collection $products */
        $products = Product::factory()->count(5)->create();
        /** @var Opening $opening */
        $opening = Opening::factory([
            'opens_at'            => now()->subDays(2),
            'closes_at'           => now()->addDay(),
            'max_delivery_orders' => 50,
            'max_pickup_orders'   => 50,
        ])->create();

        $user->cartAddress()->associate($address);
        $user->products()->sync($products->keyBy('id')->map(fn($id) => [
            'amount'      => 5,
            'quantity_cost' => 30,
        ]));

        $response = $this->post(route('orders.store'), [], [
            // Avoid redirects and just return error bag
            'Accept' => 'application/json',
        ]);

        // Assert order was created
        $response->assertStatus(412);
    }

    public function test_order_cannot_be_created_if_no_openings_are_available()
    {
        $this->loginAsUser();

        $response = $this->post(route('orders.store'), [], [
            // Avoid redirects and just return error bag
            'Accept' => 'application/json',
        ]);

        $this->assertEquals(412, $response->status());
    }

    public function test_order_can_be_cancelled()
    {
        $order = Order::factory()->create([
            'state' => Order::PENDING,
        ]);

        $response = $this->patch(route('orders.cancel', $order), [], [
            // Avoid redirects and just return error bag
            'Accept' => 'application/json',
        ]);

        $this->assertEquals(200, $response->status());
        $this->assertDatabaseHas('orders', array_merge($order->only('id'), ['state' => Order::CANCELLED]));
    }

    public function test_order_cannot_be_cancelled_if_not_pending()
    {
        $order = Order::factory()->create([
            'state' => Order::ACCEPTED,
        ]);

        $response = $this->patch(route('orders.cancel', $order), [], [
            // Avoid redirects and just return error bag
            'Accept' => 'application/json',
        ]);

        $this->assertEquals(412, $response->status());
    }

    public function test_order_cannot_be_cancelled_if_opening_is_closed()
    {
        $opening = Opening::factory()->create([
            'closes_at' => now()->subDays(1),
        ]);

        $order = Order::factory()->create([
            'opening_id' => $opening->id,
            'state'      => Order::ACCEPTED,
        ]);

        $response = $this->patch(route('orders.cancel', $order), [], [
            // Avoid redirects and just return error bag
            'Accept' => 'application/json',
        ]);

        $this->assertEquals(412, $response->status());
    }
}
