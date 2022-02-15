<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHasProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('has_product', function (Blueprint $table) {
            $table->id();

            $table->decimal('quantity', 8, 3, true);
            $table->decimal('quantity_cost', 8, 2, true);

            $table->string("holder_type");
            $table->string("holder_id");
            $table->index(["holder_type", "holder_id"]);

            $table->foreignId('product_id')->constrained();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('has_product');
    }
}
