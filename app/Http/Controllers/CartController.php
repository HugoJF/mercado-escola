<?php

namespace App\Http\Controllers;

use App\Actions\Cart\AddProduct;
use App\Actions\Cart\ProductCost;
use App\Actions\Cart\RemoveProduct;
use App\Actions\Cart\UpdateCartAddress;
use App\Actions\Openings\FindCurrentOpening;
use App\Exceptions\ProductNotInOpeningException;
use App\Http\Requests\CartProductUpdateRequest;
use App\Http\Requests\CartUpdateRequest;
use App\Http\Resources\ProductResource;
use App\Models\Opening;
use App\Models\Product;
use App\Models\User;
use Illuminate\Contracts\Auth\Access\Gate;

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

    public function updateAddress(UpdateCartAddress $updateCartAddress, CartUpdateRequest $request)
    {
        /** @var User $user */
        $user = auth()->user();
        $address = $request->address();

        $updateCartAddress->handle($user, $address);

        return app()->call('App\Http\Controllers\CartController@index');
    }

    public function addProduct(
        AddProduct $addProduct,
        CartProductUpdateRequest $request,
        Product $product
    ) {
        /** @var User $user */
        $user = auth()->user();

        $addProduct->handle($user, $product, $request->input('quantity'));

        return app()->call('App\Http\Controllers\CartController@index');
    }

    public function removeProduct(RemoveProduct $removeProduct, Product $product)
    {
        /** @var User $user */
        $user = auth()->user();

        $removeProduct->handle($user, $product);

        return app()->call('App\Http\Controllers\CartController@index');
    }
}
