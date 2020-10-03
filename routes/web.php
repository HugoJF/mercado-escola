<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::apiResource('products', \App\Http\Controllers\ProductController::class);

Route::get('/', function () {
    return view('home');
});

Route::get('me', function () {
    if (auth()->check()) {
        $user = auth()->user();
    } else {
        $user = null;
    }

    return response()->json(compact('user'));
})->name('me');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('protected', function () {
        return 'success';
    });
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
