<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\FileAdder;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Product::class);
    }

    public function index()
    {
        return ProductResource::collection(Product::paginate());
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $product = new Product($request->all());
            $product->save();

            if ($request->hasFile('images')) {
                $product->addMultipleMediaFromRequest(['images'])
                        ->each(fn(FileAdder $file) => $file->toMediaCollection());
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(Request $request, Product $product)
    {
        $product->update($request->input());

        if ($request->hasFile('images')) {
            $product->addMultipleMediaFromRequest(['images'])
                    ->each(fn(FileAdder $file) => $file->toMediaCollection());
        }

        return new ProductResource($product);
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
