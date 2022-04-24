<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Frontend routes
|--------------------------------------------------------------------------
*/

Route::get('{all?}', [App\Http\Controllers\HomeController::class, 'index'])->where('all', '([A-z\d\-\/_.]+)?');

