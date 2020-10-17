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
Route::apiResource('addresses', \App\Http\Controllers\AddressController::class);
Route::apiResource('openings', \App\Http\Controllers\OpeningController::class);

Route::prefix('favorites')->group(function () {
    Route::get('/', [\App\Http\Controllers\FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('{product}', [\App\Http\Controllers\FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('{product}', [\App\Http\Controllers\FavoriteController::class, 'destroy'])->name('favorites.destroy');
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

Route::get('{all?}', function () {
    return view('home');
})->where('all', '([A-z\d\-\/_.]+)?');
