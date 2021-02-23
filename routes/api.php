<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Product routes
|--------------------------------------------------------------------------
*/

Route::delete('products/{product}/media/{id}', [\App\Http\Controllers\ProductController::class, 'deleteMedia']);
Route::apiResource('products', \App\Http\Controllers\ProductController::class);

/*
|--------------------------------------------------------------------------
| Address routes
|--------------------------------------------------------------------------
*/

Route::apiResource('addresses', \App\Http\Controllers\AddressController::class);

/*
|--------------------------------------------------------------------------
| User routes
|--------------------------------------------------------------------------
*/

Route::apiResource('users', \App\Http\Controllers\UserController::class);

/*
|--------------------------------------------------------------------------
| Opening routes
|--------------------------------------------------------------------------
*/

Route::get('openings/current', [\App\Http\Controllers\OpeningController::class, 'current'])->name('openings.current');
Route::post('openings/{opening}/products/{product}', [\App\Http\Controllers\OpeningController::class, 'addProduct'])->name('openings.addProduct');
Route::delete('openings/{opening}/products/{product}', [\App\Http\Controllers\OpeningController::class, 'removeProduct'])->name('openings.removeProduct');
Route::apiResource('openings', \App\Http\Controllers\OpeningController::class);

/*
|--------------------------------------------------------------------------
| Order routes
|--------------------------------------------------------------------------
*/

Route::apiResource('orders', \App\Http\Controllers\OrderController::class);
Route::patch('orders/{order}/cancel',[ \App\Http\Controllers\OrderController::class, 'cancel']);

/*
|--------------------------------------------------------------------------
| Favorite routes
|--------------------------------------------------------------------------
*/

Route::prefix('favorites')->group(function () {
    Route::get('/', [\App\Http\Controllers\FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('{product}', [\App\Http\Controllers\FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('{product}', [\App\Http\Controllers\FavoriteController::class, 'destroy'])->name('favorites.destroy');
});

/*
|--------------------------------------------------------------------------
| Auth routes
|--------------------------------------------------------------------------
*/

Route::get('me', [\App\Http\Controllers\MeController::class, 'index'])->name('me.index');
Route::patch('me', [\App\Http\Controllers\MeController::class, 'update'])->name('me.update');
