<?php

namespace App\Actions\Cart;

use App\Actions\Openings\FindCurrentOpening;
use App\Exceptions\ProductNotInOpeningException;
use App\Models\Opening;
use App\Models\Product;
use App\Models\User;

class AddProduct
{
    private FindCurrentOpening $currentOpening;

    public function __construct(FindCurrentOpening $currentOpening)
    {
        $this->currentOpening = $currentOpening;
    }

    /**
     * @param User $user
     * @param Product $product
     * @param float|int $quantity
     */
    public function handle(User $user, Product $product, $quantity)
    {
        $opening = $this->currentOpening->find();

        if (!$opening || !$opening->products()->find($product)) {
            throw new ProductNotInOpeningException($product);
        }

        $user->products()->syncWithPivotValues(
            [$product->id],
            [
                // See CreateNewOrder@attachProducts on why quantity_cost should be used
                'type'          => $product->type,
                'quantity_cost' => $product->quantity_cost,
                'quantity'      => $quantity,
            ],
            false
        );
    }
}
