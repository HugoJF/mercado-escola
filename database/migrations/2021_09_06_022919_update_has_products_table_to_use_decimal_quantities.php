<?php

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateHasProductsTableToUseDecimalQuantities extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('has_product', function (Blueprint $table) {
            $table->enum('type', ['weight', 'unit']);
            $table->decimal('quantity', 8, 3, true)->change();
        });

        $this->updateData(1 / 1000, true);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('has_product', function (Blueprint $table) {
            $table->dropColumn('type');
            $table->unsignedInteger('quantity')->change();
        });

        $this->updateData(1000);
    }

    private function updateData($factor, $up = false)
    {
        /** @var Order $order */
        foreach (Order::query()->cursor() as $order) {
            /** @var Product $product */
            foreach ($order->products()->cursor() as $product) {
                $this->updateProduct($order, $product, $factor, $up);
            }
        }
    }

    private function updateProduct(Order $order, Product $product, $factor, $up)
    {
        if ($up) {
            $product->pivot->type = $product->type;
        }

        if ($order->type === 'weight') {
            $product->pivot->quantity_cost = $product->pivot->quantity_cost * $factor;
        }

        $product->pivot->save();
    }
}
