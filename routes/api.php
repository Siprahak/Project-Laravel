<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ResponseController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);

Route::apiResource('categories', CategoryController::class);

Route::apiResource('complaints', ComplaintController::class);

Route::apiResource('attachments', AttachmentController::class)->only(['index', 'store', 'show', 'destroy']);

Route::apiResource('ratings', RatingController::class);

Route::apiResource('responses', ResponseController::class);