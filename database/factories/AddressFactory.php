<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Address::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'address'    => $this->faker->address,
            'number'     => $this->faker->numberBetween(0, 999),
            'complement' => $this->faker->secondaryAddress,
            'latitude'   => $this->faker->latitude,
            'longitude'  => $this->faker->longitude,
            'user_id'    => User::factory(),
        ];
    }
}
