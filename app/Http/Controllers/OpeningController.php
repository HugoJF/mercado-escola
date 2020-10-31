<?php

namespace App\Http\Controllers;

use App\Exceptions\TooManyOpeningsException;
use App\Http\Resources\OpeningResource;
use App\Models\Opening;
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
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return OpeningResource::collection(Opening::all());
    }

    public function current()
    {
        $openings = Opening::active()->get();

        if ($openings->count() > 1) {
            throw new TooManyOpeningsException;
        }

        return new OpeningResource($openings->first());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $activeOpenings = Opening::active()->get();

        if ($activeOpenings->count() > 1) {
            throw new TooManyOpeningsException;
        }

        $opening = new Opening($request->all());
        $opening->save();

        return new OpeningResource($opening);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Opening $opening
     *
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Opening $opening)
    {
        $opening->update($request->all());

        return $opening;
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
