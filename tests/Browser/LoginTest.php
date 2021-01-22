<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LoginTest extends DuskTestCase
{
    public function test_root_will_redirect_to_login_form_if_not_authenticated()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->waitForLocation('/login')
                    ->assertSee('Mercado Escola');
        });
    }
}
