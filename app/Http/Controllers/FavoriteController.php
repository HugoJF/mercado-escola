<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ProductResource::collection(auth()->user()->favorites);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Product $product
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Product $product)
    {
        auth()->user()->favorites()->attach($product);

        return response()->noContent(201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        auth()->user()->favorites()->detach($product);

        return response()->noContent(200);
    }
}
