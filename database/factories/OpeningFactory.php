<?php

namespace Database\Factories;

use App\Models\Opening;
use Illuminate\Database\Eloquent\Factories\Factory;

class OpeningFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Opening::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'delivery_fee'        => $this->faker->randomFloat(2, 3, 15),
            'max_delivery_orders' => $this->faker->numberBetween(10, 100),
            'max_pickup_orders'   => $this->faker->biasedNumberBetween(10, 100),
            'opens_at'            => $this->faker->dateTimeBetween(now()->subMonth(), now()),
            'closes_at'           => $this->faker->dateTimeBetween(now(), now()->addMonth()),
            'delivers_at'         => $this->faker->dateTimeBetween(now()->addMonth(), now()->addMonths(2)),
        ];
    }
}
