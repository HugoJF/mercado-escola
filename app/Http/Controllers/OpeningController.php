<?php

namespace App\Http\Controllers;

use App\Actions\Openings\CreateOpening;
use App\Actions\Openings\FindCurrentOpening;
use App\Actions\Openings\GenerateReport;
use App\Http\Requests\OpeningStoreRequest;
use App\Http\Resources\OpeningResource;
use App\Models\Opening;
use App\Models\Product;
use Illuminate\Http\Request;

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

    public function report(GenerateReport $generateReport, Opening $opening)
    {
        $data = $generateReport->handle($opening);

        return compact('opening', 'data');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateOpening $createNewOpening
     * @param OpeningStoreRequest $request
     *
     * @return OpeningResource
     */
    public function store(
        CreateOpening       $createNewOpening,
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
