<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Opening;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Foundation\Testing\DatabaseTransactions;
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
            'quantity' => 2,
        ]);
        $order->products()->attach($product2, [
            'quantity' => 5,
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
            ['quantity' => 5]
        )->create();

        $this->get(route('orders.index'))
             ->assertStatus(200)
             ->assertJsonCount(1);
    }

    public function test_order_show()
    {
        $this->loginAsUser();

        $order = Order::factory([
            'user_id' => auth()->id(),
        ])->hasAttached(
            Product::factory()->count(5),
            ['quantity' => 5]
        )->create();

        $this->get(route('orders.show', $order))
             ->assertStatus(200)
             ->assertJsonCount(5, 'data.products');
    }

    public function test_order_store()
    {
        $this->loginAsUser();

        $user = auth()->user();
        $address = Address::factory(['user_id' => $user])->create();
        $products = Product::factory()->count(5)->create();
        $opening = Opening::factory([
            'enabled_at' => now()->subDay(),
            'opens_at'   => now()->subDays(2),
            'closes_at'  => now()->addDay(),
        ])->create();

        /*
         * Prepare request product list
         * Product array should be a list of [product_id, quantity]
         */
        $body = [
            'products'   => $products
                ->pluck('id')
                ->map(fn($id) => [
                    'product_id' => $id,
                    'quantity'   => random_int(1, 10),
                ])
                ->toArray(),
            'opening_id' => $opening->id,
            'address_id' => $address->id,
        ];

        $response = $this->post(route('orders.store'), $body, [
            // Avoid redirects and just return error bag
            'Accept' => 'application/json',
        ]);

        // dump($response->content());

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
}
