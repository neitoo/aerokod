<?php

use App\Http\Controllers\FlatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/')->name('v1.')->group(function () {
    Route::get('flats', [FlatController::class, 'flats'])->name('flats');
    Route::get('filters', [FlatController::class, 'filters'])->name('filters');
});
