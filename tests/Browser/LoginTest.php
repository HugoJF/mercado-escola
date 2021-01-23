<?php

namespace Tests\Browser;

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
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                    ->waitForText('Entrar')
                    ->screenshot('at login')
                    ->type('email', 'asd@asd.com')
                    ->type('password', '123123123')
                    ->screenshot('form filled')
                    ->press('Entrar')
                    ->screenshot('submitted')
                    ->pause(5000)
                    ->screenshot('waiting');
            $browser->assertDontSee('inválidos');
        });
    }
}
