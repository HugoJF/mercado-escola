<?php

namespace App\Http\Controllers;

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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $opening = new Opening($request->all());
        $opening->save();

        return $opening;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Opening  $opening
     * @return \Illuminate\Http\Response
     */
    public function show(Opening $opening)
    {
        $opening->load('products');

        return new OpeningResource($opening);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Opening  $opening
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
     * @param  \App\Models\Opening  $opening
     * @return \Illuminate\Http\Response
     */
    public function destroy(Opening $opening)
    {
        // TODO: delete and cascade? soft delete?
    }
}
