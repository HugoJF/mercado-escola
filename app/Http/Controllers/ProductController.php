<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Product::class);
    }

    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        $product = new Product($request->all());

        $product->save();

        return $product;
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function update(Request $request, Product $product)
    {
        $product->update($request->input());

        return $product;
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return $product;
    }
}
