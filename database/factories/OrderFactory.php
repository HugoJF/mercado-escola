<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Opening;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'state'      => $this->faker->randomElement([
                Order::PENDING,
                Order::ACCEPTED,
                Order::READY,
                Order::SHIPPING,
                Order::DELIVERED,
                Order::CANCELLED,
                Order::REJECTED,
            ]),
            'opening_id' => Opening::factory(),
            'user_id'    => User::factory(),
            'address_id' => Address::factory(),
        ];
    }
}
