<?php

namespace App\Http\Controllers;

use App\Actions\Products\CreateProduct;
use App\Actions\Products\UpdateProduct;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Product::class);
    }

    public function index(Request $request)
    {
        $query = Product::query();

        if ($ids = $request->input('id')) {
            return ProductResource::collection($query->whereKey($ids));
        }

        return ProductResource::collection($query->get());
    }

    public function store(CreateProduct $createNewProduct, Request $request)
    {
        return new ProductResource($createNewProduct->handle($request->all()));
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(UpdateProduct $updateProduct, Request $request, Product $product)
    {
        return new ProductResource($updateProduct->handle($product, $request->all()));
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return new ProductResource($product);
    }

    public function deleteMedia(Product $product, $id)
    {
        $product->deleteMedia($id);

        return new ProductResource($product->refresh());
    }
}
