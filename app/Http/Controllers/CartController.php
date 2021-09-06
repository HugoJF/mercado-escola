<?php

namespace App\Http\Controllers;

use App\Actions\Cart\ProductCost;
use App\Actions\Openings\FindCurrentOpening;
use App\Exceptions\ProductNotInOpeningException;
use App\Http\Requests\CartProductUpdateRequest;
use App\Http\Requests\CartUpdateRequest;
use App\Http\Resources\ProductResource;
use App\Models\Opening;
use App\Models\Product;
use App\Models\User;

class CartController extends Controller
{
    public function index(ProductCost $cartCost, FindCurrentOpening $currentOpening)
    {
        /** @var User $user */
        $user = auth()->user();
        /** @var Opening $opening */
        $opening = $currentOpening->find();

        $productsCost = $cartCost->handle($user->products);
        $deliveryCost = $user->cartAddress ? $opening->delivery_fee : 0;

        return [
            'cost'     => $productsCost + $deliveryCost,
            'opening'  => $opening,
            'address'  => $user->cartAddress,
            'products' => $user->products,
        ];
    }

    public function product(Product $product)
    {
        /** @var User $user */
        $user = auth()->user();

        return new ProductResource($user->products()->find($product));
    }

    public function updateAddress(CartUpdateRequest $request)
    {
        /** @var User $user */
        $user = auth()->user();

        if ($address = $request->address()) {
            $this->authorize('view', $address);

            $user->cartAddress()->associate($address);
        } else {
            $user->cartAddress()->dissociate();
        }
        $user->save();

        return app()->call('App\Http\Controllers\CartController@index');
    }

    public function addProduct(
        FindCurrentOpening $currentOpening,
        CartProductUpdateRequest $request,
        Product $product
    ) {
        /** @var User $user */
        $user = auth()->user();
        $opening = $currentOpening->find();

        if (!$opening || !$opening->products()->find($product)) {
            throw new ProductNotInOpeningException($product);
        }

        $user->products()->syncWithPivotValues(
            [$product->id],
            [
                // See CreateNewOrder@attachProducts on why quantity_cost should be used
                'type'          => $product->type,
                'quantity_cost' => $product->quantity_cost,
                'quantity'      => $request->input('quantity'),
            ],
            false
        );

        return app()->call('App\Http\Controllers\CartController@index');
    }

    public function removeProduct(Product $product)
    {
        /** @var User $user */
        $user = auth()->user();

        $user->products()->detach($product);

        return app()->call('App\Http\Controllers\CartController@index');
    }
}
