<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class MeTest extends TestCase
{
    use DatabaseTransactions;

    public function test_me_route_returns_authed_user()
    {
        $user = User::factory()->create();

        Auth::login($user);

        $this->get(route('me.index'))
            ->assertJson(['user' => $user->toArray()]);
    }

    public function test_me_route_returns_null_if_not_authed()
    {
        $this->get(route('me.index'))
             ->assertJson(['user' => null]);
    }
}
