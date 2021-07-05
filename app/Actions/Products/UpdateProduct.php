<?php

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\FileAdder;

class UpdateProduct
{
    public function handle(Product $product, array $data)
    {
        return DB::transaction(fn() => $this->run($product, $data));
    }

    protected function run(Product $product, array $data)
    {
        $product->update($data);

        if (request()->hasFile('images')) {
            $product->addMultipleMediaFromRequest(['images'])
                    ->each(fn(FileAdder $file) => $file->toMediaCollection());
        }

        return $product;
    }
}
