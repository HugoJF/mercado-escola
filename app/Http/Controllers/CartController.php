<?php

namespace App\Http\Controllers;

use App\Actions\Openings\FindCurrentOpening;
use App\Http\Requests\CartUpdateRequest;
use App\Models\Product;
use App\Models\User;

class CartController extends Controller
{
    public function index(FindCurrentOpening $currentOpening)
    {
        /** @var User $user */
        $user = auth()->user();

        return [
            'opening'  => $currentOpening->find(),
            'address'  => $user->cartAddress,
            'products' => $user->products,
        ];
    }

    public function updateAddress(CartUpdateRequest $request)
    {
        /** @var User $user */
        $user = auth()->user();

        if ($address = $request->address()) {
            $user->cartAddress()->associate($request->address());
        } else {
            $user->cartAddress()->dissociate();
        }
        $user->save();

        return app()->call('App\Http\Controllers\CartController@index');
    }

    public function addProduct(Product $product)
    {
        auth()->user()->products()->attach($product);

        return app()->call('App\Http\Controllers\CartController@index');
    }

    public function removeProduct(Product $product)
    {
        auth()->user()->products()->dettach($product);

        return app()->call('App\Http\Controllers\CartController@index');
    }
}
