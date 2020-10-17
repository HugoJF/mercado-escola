<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return auth()->user()->favorites;
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

        return response(null, 201);
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

        return response(null, 200);
    }
}
