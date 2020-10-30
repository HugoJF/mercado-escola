<?php

namespace Tests\Feature;

use App\Models\Opening;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class OpeningTest extends TestCase
{
    use DatabaseTransactions;

    public function test_guests_cannot_see_openings_index()
    {
        $this->get(route('openings.index'))
             ->assertStatus(403);
    }

    public function test_users_can_see_openings()
    {
        $this->loginAsUser();

        $this->get(route('openings.index'))
             ->assertStatus(200);
    }

    public function test_index_will_not_show_closed_openings()
    {
        $this->loginAsUser();

        Opening::factory([
            'opens_at'   => now()->subDays(3),
            'enabled_at' => now()->subDays(2),
            'closes_at'  => now()->subDays(1),
        ])->create();

        $this->get(route('openings.index'))
             ->assertJson([]);
    }

    public function test_index_will_not_show_not_opened_openings()
    {
        $this->loginAsUser();

        Opening::factory([
            'opens_at'   => now()->addDays(1),
            'enabled_at' => null,
            'closes_at'  => now()->addDays(3),
        ])->create();

        $this->get(route('openings.index'))
             ->assertJson([]);
    }

    public function test_index_will_not_show_opened_but_disabled_openings()
    {
        $this->loginAsUser();

        Opening::factory([
            'opens_at'   => now()->subDay(),
            'enabled_at' => null,
            'closes_at'  => now()->addDay(),
        ])->create();

        $this->get(route('openings.index'))
             ->assertJson([]);
    }

    public function test_user_can_see_openings_index()
    {
        $this->loginAsUser();

        $opening = Opening::factory([
            'opens_at'   => now()->subDay(),
            'enabled_at' => now()->subHour(),
            'closes_at'  => now()->addDay(),
        ])->create();

        $this->get(route('openings.index'))
             ->assertJson(['data' => [$opening->attributesToArray()]]);
    }

    public function test_guest_cannot_create_openings()
    {
        $this->post(route('openings.store'), [])
             ->assertStatus(403);
    }

    public function test_users_cannot_create_openings()
    {
        $this->loginAsUser();

        $this->post(route('openings.store'), [])
             ->assertStatus(403);
    }

    public function test_admins_can_create_openings()
    {
        $this->loginAsAdmin();
        $this->post(route('openings.store'), Opening::factory()->make()->attributesToArray())
             ->assertStatus(201);
    }

    public function test_admins_cannot_create_openings_when_an_active_one_exists()
    {
        Opening::factory([
            'opens_at'     => now()->subDay(),
            'closes_at'    => now()->addDay(),
            'enabled_at' => now()->subHour(),
        ])->create();

        $this->loginAsAdmin();

        $this->post(route('openings.store'), Opening::factory()->make()->attributesToArray())
             ->assertStatus(412);
    }

    public function test_guests_cannot_see_openings_show()
    {
        $opening = Opening::factory()->create();

        $this->get(route('openings.show', $opening))
             ->assertStatus(403);
    }

    public function test_user_can_see_openings_show()
    {
        $this->loginAsUser();

        $opening = Opening::factory()->create();

        $this->get(route('openings.show', $opening))
             ->assertStatus(200);
    }

    public function test_guest_cannot_update_opening()
    {
        $opening = Opening::factory()->create();

        $this->patch(route('openings.update', $opening), ['enabled_at' => now()])
             ->assertStatus(403);
    }

    public function test_user_cannot_update_opening()
    {
        $opening = Opening::factory()->create();

        $this->loginAsUser();

        $this->patch(route('openings.update', $opening), ['enabled_at' => now()])
             ->assertStatus(403);
    }

    public function test_admin_can_update_opening()
    {
        $opening = Opening::factory()->create();

        $this->loginAsAdmin();

        $this->patch(route('openings.update', $opening), ['enabled_at' => now()])
             ->assertStatus(200);
    }
}
