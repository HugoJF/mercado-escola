<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // TODO: identificar use-cases para mostrar o preco e implementar algo decente (price vs cost)
        // TODO: produtos adicionados no carrinho dao mensagem de sucesso no erro
        // TODO: calculo de peso ainda esta incompleto (faltando conversao pra KG)
        // TODO: logica de nomes repetida
        // TODO: atualizar coisas relacionados ao carrinho
        // TODO: adicionar campos de forms e regras
        // TODO: documentar logica de peso se normalizado por kg
        // TODO: atualizar email
        // TODO: procurar usos de quantity_type
        // TODO: backup do BD em producao
        // TODO: atualizar informacao no carrinho (dados que armazenam a quantidade que foi comprada)


        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->mediumText('description')->nullable();

            $table->string('quantity_type');
            $table->unsignedInteger('quantity_cost');

            $table->string('unit_name_singular')->nullable();
            $table->string('unit_name_plural')->nullable();
            $table->unsignedInteger('weight_increment')->nullable();

            $table->softDeletes();
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
        Schema::dropIfExists('products');
    }
}
