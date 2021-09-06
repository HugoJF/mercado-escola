<?php

use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateProductsTableToUseDecimalWeightIncrements extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('weight_increment', 8, 3, true)->change();
        });

        $this->updateData(1/1000);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedInteger('weight_increment')->change();
        });

        $this->updateData(1000);
    }

    private function updateData($factor)
    {
        /** @var Product $opening */
        foreach (Product::query()->cursor() as $product) {
            $product->weight_increment = $product->weight_increment * $factor;
            $product->save();
        }
    }
}
