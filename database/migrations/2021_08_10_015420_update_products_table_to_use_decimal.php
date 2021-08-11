<?php

use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateProductsTableToUseDecimal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('quantity_cost', 8, 2, true)->change();
        });

        /** @var Product $product */
        foreach (Product::query()->cursor() as $product) {
            $product->quantity_cost = $product->quantity_cost / 100;
            $product->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedInteger('quantity_cost')->change();
        });

        /** @var Product $product */
        foreach (Product::query()->cursor() as $product) {
            $product->quantity_cost = $product->quantity_cost * 100;
            $product->save();
        }
    }
}
