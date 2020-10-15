<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Opening;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->has(Address::factory()->count(5))->create([
            'email'    => 'asd@asd.com',
            'password' => bcrypt('123123123'),
        ]);

        Opening::factory()->has(Product::factory()->count(10))->create();
    }
}
