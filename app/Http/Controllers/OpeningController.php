<?php

namespace App\Http\Controllers;

use App\Actions\Openings\CreateNewOpening;
use App\Actions\Openings\FindCurrentOpening;
use App\Http\Requests\OpeningStoreRequest;
use App\Http\Resources\OpeningResource;
use App\Models\Opening;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class OpeningController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Opening::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return OpeningResource::collection(Opening::all());
    }

    public function current(FindCurrentOpening $currentOpening)
    {
        return new OpeningResource($currentOpening->find());
    }

    public function report(Opening $opening)
    {
        $opening->loadMissing(['orders', 'orders.products']);
        /** @var Collection $orders */
        $orders = $opening->orders;

        $data = $orders->pluck('products')->flatten(1)->groupBy('id')->map(function ($products, $id) {
            $product = Product::find($id);
            $total = $products->pluck('pivot')->sum('quantity');

            if ($products[0]->type === 'weight') {
                $weight = $total * $products[0]->weight_increment;
                if ($weight > 1000) {
                    $weight = round($weight / 1000, 3);
                    $text = "$weight kg";
                } else {
                    $text = "$weight gramas";
                }
            } else {
                if ($total === 1) {
                    $text = "$total $product->unit_name_singular";
                } else {
                    $text = "$total $product->unit_name_plural";
                }
            }

            return [
                'product' => $product->toArray(),
                'report' => [
                    'total' => $text,
                    'orders' => $products->count(),
                ]
            ];
        })->values();

        return [
            'opening' => $opening,
            'data' => $data,
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateNewOpening $createNewOpening
     * @param OpeningStoreRequest $request
     *
     * @return OpeningResource
     */
    public function store(
        CreateNewOpening    $createNewOpening,
        OpeningStoreRequest $request
    )
    {
        return new OpeningResource($createNewOpening->handle($request->validated()));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Opening $opening
     *
     * @return OpeningResource
     */
    public function show(Opening $opening)
    {
        $opening->loadMissing([
            'products',
        ]);

        return new OpeningResource($opening);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Opening $opening
     *
     * @return OpeningResource
     */
    public function update(Request $request, Opening $opening)
    {
        $opening->update($request->all());

        return new OpeningResource($opening);
    }

    public function addProduct(Opening $opening, Product $product)
    {
        $opening->products()->syncWithoutDetaching([$product->id]);

        return new OpeningResource($opening);
    }

    public function removeProduct(Opening $opening, Product $product)
    {
        $opening->products()->detach($product);

        return new OpeningResource($opening);
    }
}
