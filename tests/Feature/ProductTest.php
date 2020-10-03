<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use DatabaseMigrations;

    public function test_user_cannot_see_products_index()
    {
        $this->get(route('products.index'))
             ->assertStatus(403);
    }

    public function test_admin_can_see_product_index()
    {
        $this->loginAsAdmin();

        $this->get(route('products.index'))
             ->assertStatus(200);
    }

    public function test_user_cannot_create_product()
    {
        $this->post(route('products.store'), [])
            ->assertStatus(403);
    }

    public function test_admin_can_create_product()
    {
        $this->loginAsAdmin();

        $this->post(route('products.store'), Product::factory()->make()->toArray())
             ->assertStatus(201);
    }

    public function test_user_can_see_product_show()
    {
        $product = Product::factory()->create();

        $this->get(route('products.show', $product))
            ->assertStatus(200);
    }

    public function test_user_cannot_update_product()
    {
        $product = Product::factory()->create();

        $this->patch(route('products.update', $product), ['title' => 'new title'])
             ->assertStatus(403);
    }

    public function test_admin_can_update_product()
    {
        $product = Product::factory()->create();

        $this->loginAsAdmin();

        $this->patch(route('products.show', $product))
             ->assertStatus(200);
    }

    public function test_user_cannot_delete_product()
    {
        $product = Product::factory()->create();

        $this->delete(route('products.destroy', $product))
             ->assertStatus(403);
    }

    public function test_admin_can_delete_product()
    {
        $product = Product::factory()->create();

        $this->loginAsAdmin();

        $this->delete(route('products.destroy', $product))
             ->assertStatus(200);
    }
}
