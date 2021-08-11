<?php

use App\Models\Opening;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateOpeningsTableToUseDecimal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('openings', function (Blueprint $table) {
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
        Schema::table('openings', function (Blueprint $table) {
            $table->unsignedInteger('delivery_fee')->change();
        });

        $this->updateData(100);
    }

    private function updateData($factor)
    {
        /** @var Opening $opening */
        foreach (Opening::query()->cursor() as $opening) {
            $opening->delivery_fee = $opening->delivery_fee * $factor;
            $opening->save();
        }
    }
}
