<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Address::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function index()
    {
        return auth()->user()->addresses;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return Address
     */
    public function store(Request $request)
    {
        $address = new Address($request->all());

        $address->user()->associate(auth()->user());

        $address->save();

        return $address;
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Address $address
     *
     * @return Address
     */
    public function show(Address $address)
    {
        return $address;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Address      $address
     *
     * @return Address
     */
    public function update(Request $request, Address $address)
    {
        $address->fill($request->all());

        $address->save();

        return $address;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Address $address
     *
     * @return Address
     * @throws \Exception
     */
    public function destroy(Address $address)
    {
        $address->delete();

        return $address;
    }
}
