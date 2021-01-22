<?php

namespace App\Http\Controllers;

use App\Actions\Openings\FindOverlappingOpenings;
use App\Exceptions\OverlappingOpeningException;
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

    public function current()
    {
        /** @var Collection $openings */
        $openings = Opening::active()->get();

        if ($openings->count() > 1) {
            throw new OverlappingOpeningException;
        }

        if ($openings->isEmpty()) {
            return null;
        }

        return new OpeningResource($openings->first());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param FindOverlappingOpenings $overlappingOpenings
     * @param OpeningStoreRequest     $request
     *
     * @return OpeningResource
     */
    public function store(
        FindOverlappingOpenings $overlappingOpenings,
        OpeningStoreRequest $request
    ) {

        $overlap = $overlappingOpenings->find(
            $request->opensAt(),
            $request->closesAt(),
        );

        if ($overlap) {
            throw new OverlappingOpeningException;
        }

        $opening = new Opening($request->validated());
        $opening->save();

        return new OpeningResource($opening);
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
        return new OpeningResource($opening);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Opening      $opening
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

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Opening $opening
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Opening $opening)
    {
        // TODO: delete and cascade? soft delete?
    }
}
