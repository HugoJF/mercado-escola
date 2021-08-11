<?php

use App\Models\Order;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateOrdersTableToUseDecimal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('delivery_fee', 8, 2, true)->change();
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
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedInteger('delivery_fee')->change();
        });

        $this->updateData(100);
    }

    private function updateData($factor)
    {
        /** @var Order $order */
        foreach (Order::query()->cursor() as $order) {
            $order->delivery_fee = $order->delivery_fee * $factor;
            $order->save();
        }
    }
}
