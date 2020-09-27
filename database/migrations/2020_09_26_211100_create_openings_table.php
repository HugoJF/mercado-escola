<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpeningsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('openings', function (Blueprint $table) {
            $table->id();

            $table->dateTime('enabled_at')->nullable();

            $table->unsignedInteger('max_delivery_orders')->default(0);
            $table->unsignedInteger('max_pickup_orders')->default(0);

            $table->dateTime('opens_at');
            $table->dateTime('closes_at');

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
        Schema::dropIfExists('openings');
    }
}
