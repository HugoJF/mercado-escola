<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class FavoriteTest extends TestCase
{
    use DatabaseTransactions;

    public function test_favorites_work()
    {
        /** @var User $user */
        $user = User::factory()->create();
        $product = Product::factory()->create();

        $user->favorites()->attach($product);

        $this->assertTrue($product->is($user->favorites->first()));
    }

    public function test_user_can_see_favorites()
    {
        /** @var User $user */
        $user = User::factory()->create();
        $product = Product::factory()->create();

        auth()->login($user);

        $user->favorites()->attach($product);

        $this->get(route('favorites.index'))
            ->assertJson(['data' => [$product->attributesToArray()]]);
    }

    public function test_user_can_create_favorite()
    {

        /** @var User $user */
        $user = User::factory()->create();
        $product = Product::factory()->create();

        auth()->login($user);

        $this->post(route('favorites.store', $product))
            ->assertStatus(201);

        $this->get(route('favorites.index'))
             ->assertJson(['data' => [$product->attributesToArray()]]);
    }

    public function test_user_can_delete_favorite()
    {
        /** @var User $user */
        $user = User::factory()->create();
        $product = Product::factory()->create();

        auth()->login($user);

        $user->favorites()->attach($product);

        $this->delete(route('favorites.destroy', $product))
             ->assertStatus(200);

        $this->get(route('favorites.index'))
             ->assertJson([]);
    }
}
