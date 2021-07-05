<?php

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\FileAdder;

class CreateNewProduct
{
    public function handle(array $data)
    {
        return DB::transaction(fn() => $this->run($data));
    }

    protected function run(array $data)
    {
        $product = new Product($data);
        $product->save();

        if (request()->hasFile('images')) {
            $product->addMultipleMediaFromRequest(['images'])
                    ->each(fn(FileAdder $file) => $file->toMediaCollection());
        }

        return $product;
    }
}
