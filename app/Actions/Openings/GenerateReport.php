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

        return $report->values()->toArray();
    }

    protected function generateReport(Collection $productGroup)
    {
        if ($productGroup->first()->type === 'weight') {
            return $this->generateWeightReport($productGroup);
        } else {
            return $this->generateUnitReport($productGroup);
        }
    }

    protected function generateWeightReport(Collection $productGroup)
    {
        $weight = $productGroup->reduce(function ($weight, $product) {
            return $weight + $product->weight_increment * $product->pivot->quantity;
        }, 0);

        if ($weight > 1000) {
            $weight = round($weight / 1000, 3);
            $text = "$weight kg";
        } else {
            $text = "$weight gramas";
        }

        return [
            'total' => $text,
            'orders' => $productGroup->count(),
        ];
    }

    protected function generateUnitReport(Collection $productGroup)
    {
        $product = $productGroup->first();
        $units = $productGroup->reduce(function ($units, $product) {
            return $units + $product->pivot->quantity;
        }, 0);

        if ($units === 1) {
            $text = "$units $product->unit_name_singular";
        } else {
            $text = "$units $product->unit_name_plural";
        }

        return [
            'total' => $text,
            'orders' => $productGroup->count(),
        ];
    }
}
