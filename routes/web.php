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

/*
 * TODO
 *
 * https://i.imgur.com/FgBKuYB.png
 * https://i.imgur.com/127LyuF.png
 * https://i.imgur.com/LZbGnBe.png
 */

Route::delete('products/{product}/media/{id}', [\App\Http\Controllers\ProductController::class, 'deleteMedia']);
Route::apiResource('products', \App\Http\Controllers\ProductController::class);

Route::apiResource('addresses', \App\Http\Controllers\AddressController::class);

Route::apiResource('users', \App\Http\Controllers\UserController::class);

Route::get('openings/current', [\App\Http\Controllers\OpeningController::class, 'current'])->name('openings.current');
Route::post('openings/{opening}/products/{product}', [\App\Http\Controllers\OpeningController::class, 'addProduct'])->name('openings.addProduct');
Route::delete('openings/{opening}/products/{product}', [\App\Http\Controllers\OpeningController::class, 'removeProduct'])->name('openings.removeProduct');
Route::apiResource('openings', \App\Http\Controllers\OpeningController::class);

Route::apiResource('orders', \App\Http\Controllers\OrderController::class);

Route::prefix('favorites')->group(function () {
    Route::get('/', [\App\Http\Controllers\FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('{product}', [\App\Http\Controllers\FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('{product}', [\App\Http\Controllers\FavoriteController::class, 'destroy'])->name('favorites.destroy');
});

Route::get('mailable', function () {
    $order = \App\Models\Order::query()->inRandomOrder()->first();

    return new App\Mail\OrderCreated($order);
});

Route::get('me', [\App\Http\Controllers\MeController::class, 'index'])->name('me.index');
Route::patch('me', [\App\Http\Controllers\MeController::class, 'update'])->name('me.update');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('protected', function () {
        return 'success';
    });
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('{all?}', function () {
    return view('home');
})->where('all', '([A-z\d\-\/_.]+)?');
