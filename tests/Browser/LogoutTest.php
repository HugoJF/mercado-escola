<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LogoutTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_user_can_logout_and_will_be_redirected_to_login()
    {
        $user = User::factory()->create();

        $this->browse(fn(Browser $browser) => $browser
            ->loginAs($user->id)
            ->visit('/conta/sair')
            ->waitForLocation('/login')
            ->assertSee('Mercado Escola')
        );
    }
}
