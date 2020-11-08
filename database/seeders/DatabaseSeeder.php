<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Opening;
use App\Models\Order;
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
        /** @var User $user */
        $user = User::factory()->create([
            'email'    => 'asd@asd.com',
            'password' => bcrypt('123123123'),
            'admin'    => true,
        ]);
        $addresses = Address::factory()->count(5)->create();
        $opening = Opening::factory()->create();
        $products = Product::factory()->count(5)->create();

        /** @var Product $product */
        foreach ($products as $product) {
            $images = random_int(0, 5);

            foreach (range(0, $images) as $i) {
                $image = file_get_contents("https://picsum.photos/500/500");
                file_put_contents(storage_path("app/seed/image.jpg"), $image);

                $media = $product->addMedia(storage_path("app/seed/image.jpg"));
                $media->toMediaCollection();
            }
        }

        $opening->products()->saveMany($products);
        $user->addresses()->saveMany($addresses);

        $orders = Order::factory([
            'opening_id' => $opening->id,
            'address_id' => $addresses->random()->id,
            'user_id'    => $user->id,
        ])->count(5)->create();

        /** @var Order $order */
        foreach ($orders as $order) {
            $p = $products
                ->random(random_int(2, 5))
                ->keyBy(fn($product) => $product->id)
                ->map(fn() => ['quantity' => random_int(2, 5)]);
            $order->products()->sync($p);
        }
    }
}
