<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title'         => $this->faker->name,
            'description'   => $this->faker->sentence,
            'quantity_type' => $this->faker->randomElement([
                'UNIT',
                'WEIGHT_1G',
                'WEIGHT_10G',
                'WEIGHT_100G',
                'WEIGHT_1000G',
            ]),
            'quantity_cost' => $this->faker->numberBetween(1, 1000),
        ];
    }
}
