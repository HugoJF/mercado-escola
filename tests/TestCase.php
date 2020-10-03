<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Auth;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function loginAsAdmin(): User
    {
        $user = User::factory()->create(['admin' => true]);

        Auth::login($user);

        return $user;
    }

    protected function loginAsUser(): User
    {
        $user = User::factory()->create(['admin' => false]);

        Auth::login($user);

        return $user;
    }
}
