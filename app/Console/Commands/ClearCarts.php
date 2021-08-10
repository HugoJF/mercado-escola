<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ClearCarts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cart:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear user carts';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $users = User::query()->cursor();

        /** @var User $user */
        foreach ($users as $user) {
            $this->info("Clearing cart for user $user->name");
            $user->products()->sync([]);
        }
    }
}
