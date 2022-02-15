<?php

namespace App\Actions\Openings;

use App\Models\Opening;
use App\Models\Product;
use Illuminate\Support\Collection;

class GenerateReport
{
    protected Collection $products;

    protected function loadProducts(array $productsId)
    {
        $this->products = Product::query()->findMany($productsId)->keyBy('id');
    }

    protected function getProduct($id)
    {
        return $this->products->get($id)->toArray();
    }

    public function handle(Opening $opening)
    {
        $opening->loadMissing(['orders', 'orders.products']);
        /** @var Collection $orders */
        $orders = $opening->orders;

        $groupedProducts = $orders->pluck('products')->flatten(1)->groupBy('id');
        $this->loadProducts($groupedProducts->keys()->toArray());

        $report = $groupedProducts->map(function ($productGroup, $id) {
            return [
                'product' => $this->getProduct($id),
                'report' => $this->generateReport($productGroup),
            ];
        });

        return $report->toArray();
    }

    protected function generateReport(Collection $productGroup)
    {
        /** @var Product $product */
        $product = $productGroup->first();
        $quantity = $productGroup->pluck('pivot.quantity')->sum();
        $text = $quantity === 1 ? $product->unit_name_singular : $product->unit_name_plural;

        return [
            'total' => $quantity . ' ' . $text,
            'orders' => $productGroup->count(),
        ];
    }
}
