<?php

use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateProductTypesColumnInProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->enum('type', ['weight', 'unit']);
            $table->string('unit_name_singular')->nullable();
            $table->string('unit_name_plural')->nullable();

            $table->unsignedInteger('weight_increment')->nullable(); // grams
        });

        /** @var Product $product */
        foreach (Product::cursor() as $product) {
            $type = $product->quantity_type;
            $increments = [
                'WEIGHT_1G'    => 1,
                'WEIGHT_10G'   => 10,
                'WEIGHT_100G'  => 100,
                'WEIGHT_1000G' => 1000,
            ];

            if ($type === 'UNIT') {
                $product->type = 'unit';
                $product->unit_name_plural = 'unidades';
                $product->unit_name_singular = 'unidade';
            } else {
                $product->type = 'weight';
                $product->weight_increment = $increments[ $type ];
            }

            $product->save();
        }

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['quantity_type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('quantity_type');
        });

        /** @var Product $product */
        foreach (Product::cursor() as $product) {
            $product->quantity_type = 'UNIT';
            $product->save();
        }

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'type',
                'unit_name_singular',
                'unit_name_plural',
                'weight_increment',
            ]);
        });
    }
}
