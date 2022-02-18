<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Frontend routes
|--------------------------------------------------------------------------
*/

Route::get('email', function () {
    return new \App\Mail\OrderCreated(\App\Models\Order::latest()->first());
});

Route::get('hello', fn () => ['data' => 'Hello world']);

Route::get('{all?}', [App\Http\Controllers\HomeController::class, 'index'])->where('all', '([A-z\d\-\/_.]+)?');

