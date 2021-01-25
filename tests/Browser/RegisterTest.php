<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class RegisterTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_guest_can_register_and_will_be_redirected_to_onboarding()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/register')
                    ->waitForText('Criando uma nova conta')
                    ->type('name', 'User')
                    ->type('email', 'qwe@qwe.com')
                    ->type('password', '123456789')
                    ->type('password_confirmation', '123456789')
                    ->press('Registrar')
                    ->waitForText('Quase lá')
                    ->assertSee('Quase lá');
        });
    }
}
