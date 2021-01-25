<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LoginTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_root_will_redirect_to_login_form_if_not_authenticated()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->waitForLocation('/login')
                    ->assertSee('Mercado Escola');
        });
    }

    public function test_guest_is_able_to_authenticate()
    {
        User::factory([
            'email'    => 'asd1@asd.com',
            'password' => bcrypt('1231231231'),
        ])->create();

        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                    ->waitForText('Entrar')
                    ->type('email', 'asd1@asd.com')
                    ->type('password', '1231231231')
                    ->press('Entrar')
                    ->pause(5000)
                    ->assertDontSee('inválidos')
                    ->waitForLocation('/home')
                    ->assertSee('Olá');
        });
    }
}
