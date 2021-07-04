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
        $type = $this->faker->randomElement([
            'weight', 'unit',
        ]);

        if ($type === 'unit') {
            $extra = [
                'unit_name_singular' => 'caixa',
                'unit_name_plural'   => 'caixas',
            ];
        } else {
            $extra = [
                'weight_increment' => 350,
            ];
        }

        return array_merge($extra, [
            'name'          => $this->faker->name,
            'description'   => $this->faker->sentence,
            'type'          => $type,
            'quantity_cost' => $this->faker->numberBetween(1, 1000),
        ]);
    }
}
