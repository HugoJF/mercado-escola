<?php

namespace Tests\Unit\Opening;

use App\Actions\Openings\GenerateReport;
use App\Models\Opening;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ReportTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_example()
    {
        /** @var GenerateReport $generateReport */
        $generateReport = app(GenerateReport::class);

        /** @var Opening $opening */
        $opening = Opening::factory()->create();

        $product1 = Product::factory()->create([
            'type' => 'weight',
            'quantity_step' => 0.5,
            'quantity_cost' => 5,
        ]);
        $product2 = Product::factory()->create([
            'type' => 'unit',
            'unit_name_singular' => 'caixa',
            'unit_name_plural' => 'caixas',
            'quantity_cost' => 15,
        ]);

        /** @var Order $order1 */
        $order1 = Order::factory()->create();
        $order1->products()->attach($product1, [
            'quantity' => 2,
            'quantity_cost' => 10,
        ]);

        /** @var Order $order2 */
        $order2 = Order::factory()->create();
        $order2->products()->attach($product1, [
            'quantity' => 3,
            'quantity_cost' => 10,
        ]);
        $order2->products()->attach($product2, [
            'quantity' => 3,
            'quantity_cost' => 20,
        ]);

        $opening->orders()->save($order1);
        $opening->orders()->save($order2);

        $report = $generateReport->handle($opening);

        $statsReport = collect($report)->map(fn($item) => $item['report'])->toArray();
        $expectedReport = [
            $product1->id => [
                "total" => "5 kg",
                "orders" => 2,
            ],
            $product2->id => [
                "total" => "3 caixas",
                "orders" => 1,
            ]
        ];
        $this->assertEquals($expectedReport, $statsReport);
    }
}
