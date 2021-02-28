<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class HomeTest extends TestCase
{
    use DatabaseTransactions;

    public function test_home_works_if_user_is_authed()
    {
        $user = User::factory()->create();

        Auth::login($user);

        $this->get('/')
             ->assertStatus(200);
    }
    public function test_home_redirects_guests()
    {
        $this->get('/')
             ->assertStatus(302);
    }
}
