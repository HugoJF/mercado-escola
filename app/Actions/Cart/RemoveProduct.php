<?php

namespace App\Actions\Cart;

use App\Actions\Openings\FindCurrentOpening;
use App\Exceptions\ProductNotInOpeningException;
use App\Models\Opening;
use App\Models\Product;
use App\Models\User;

class RemoveProduct
{
    /**
     * @param User $user
     * @param Product $product
     */
    public function handle(User $user, Product $product)
    {
        $user->products()->detach($product);
    }
}
