<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AddressTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    public function test_guest_cannot_see_address_index()
    {
        $this->get(route('addresses.index'))
             ->assertStatus(403);
    }

    public function test_user_can_only_see_own_addresses()
    {
        $user = $this->loginAsUser();

        $address = Address::factory()->create(['user_id' => $user->id]);
        $other = User::factory()
                     ->has(Address::factory())
                     ->create();

        $this->get(route('addresses.index'))
             ->assertStatus(200)
             ->assertJson([$address->toArray()])
             ->assertJsonCount(1);
        // FIXME: is there a better way to assetJsonMissing?
        // ->assertJsonMissing([$otherAddress->toArray()]);
    }

    public function test_guest_cannot_create_addresses()
    {
        $this->post(route('addresses.store'), [])
             ->assertStatus(403);
    }

    public function test_user_can_create_address()
    {
        $user = $this->loginAsUser();

        $addressData = array_merge(
            Address::factory()->make()->toArray(),
            ['user_id' => $user->id],
        );

        $this->post(route('addresses.store'), $addressData)
             ->assertStatus(201);

        $this->assertDatabaseHas('addresses', $addressData);
    }

    public function test_user_can_see_address()
    {
        $user = $this->loginAsUser();
        $address = Address::factory()->create(['user_id' => $user->id]);

        $this->get(route('addresses.show', $address))
             ->assertStatus(200);
    }

    public function test_user_cannot_see_address_thats_not_owned_by_him()
    {
        $this->loginAsUser();
        $address = Address::factory()->create();

        $this->get(route('addresses.show', $address))
             ->assertStatus(403);
    }

    public function test_user_can_update_address()
    {
        $user = $this->loginAsUser();

        $address = Address::factory()->create(['user_id' => $user->id]);

        $addressUpdate = ['address' => $this->faker->address];

        $this->patch(route('addresses.update', $address), $addressUpdate)
             ->assertStatus(200);

        $this->assertDatabaseHas('addresses', array_merge(
            $address->toArray(),
            $addressUpdate,
        ));
    }

    public function test_user_can_delete_address()
    {
        $user = $this->loginAsUser();
        $address = Address::factory()->create(['user_id' => $user->id]);

        $this->delete(route('addresses.destroy', $address))
             ->assertStatus(200);
    }
}
