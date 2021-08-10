<?php

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateHasProductsTableToUseDecimal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('has_product', function (Blueprint $table) {
            $table->decimal('quantity_cost', 8, 2, true)->change();
        });

        $this->updateData(1 / 100);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('has_product', function (Blueprint $table) {
            $table->unsignedInteger('quantity_cost')->change();
        });

        $this->updateData(100);
    }

    private function updateData($factor)
    {
        /** @var Order $order */
        foreach (Order::query()->cursor() as $order) {
            /** @var Product $product */
            foreach ($order->products()->cursor() as $product) {
                $product->pivot->quantity_cost = $product->pivot->quantity_cost * $factor;
                $product->pivot->save();
            }
        }
    }
}
