<?php

namespace App\Providers;

use App\Models\Address;
use App\Models\Favorite;
use App\Models\Order;
use App\Models\Product;
use App\Policies\AddressPolicy;
use App\Policies\FavoritePolicy;
use App\Policies\OrderPolicy;
use App\Policies\ProductPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Product::class => ProductPolicy::class,
        Address::class => AddressPolicy::class,
        Order::class => OrderPolicy::class,
        Favorite::class => FavoritePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        //
    }
}
