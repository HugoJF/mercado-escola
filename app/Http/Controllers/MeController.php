<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;

class MeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if (auth()->check()) {
            $user = auth()->user();
        } else {
            $user = null;
        }

        return response()->json(compact('user'));
    }

    public function update(Request $request)
    {
        /** @var User $user */
        $user = auth()->user();

        $user->update($request->input());

        return response()->json(compact('user'));
    }
}
