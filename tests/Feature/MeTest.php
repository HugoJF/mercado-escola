<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class MeTest extends TestCase
{
    public function test_me_route_returns_authed_user()
    {
        $user = User::factory()->create();

        Auth::login($user);

        $this->get(route('me'))
            ->assertJson(['user' => $user->toArray()]);
    }

    public function test_me_route_returns_null_if_not_authed()
    {
        $this->get(route('me'))
             ->assertJson(['user' => null]);
    }
}
