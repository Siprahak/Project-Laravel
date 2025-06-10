<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\Api\AuthController;


// Rute pendaftaran dan login pengguna
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::apiResource('categories', CategoryController::class)->only(['index', 'store', 'show', 'update', 'delete']);
    Route::apiResource('complaints', ComplaintController::class)->only(['index', 'store', 'show','update', 'destroy']);
    Route::apiResource('attachments', AttachmentController::class)->only(['index', 'store', 'show','update', 'destroy']);
    Route::apiResource('ratings', RatingController::class)->only(['index', 'store', 'show','update', 'destroy']);
});

// Rute hanya untuk admin
Route::middleware(['auth:sanctum', 'cekrole:admin'])->group(function () {
    Route::apiResource('responses', ResponseController::class)->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::apiResource('users', UserController::class)->only(['index', 'store', 'show','update', 'destroy']);
    Route::post('/admin/users', [UserController::class, 'createUserByAdmin']);
    Route::put('/admin/users/{id}', [UserController::class, 'updateUserByAdmin']);

    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

});


// Route::middleware('auth:sanctum', 'cekrole:user,admin')->group(function () {
//     Route::apiResource('complaints', ComplaintController::class)->only(['index', 'store', 'show', 'destroy']);
//     Route::apiResource('attachments', AttachmentController::class)->only(['index', 'store', 'show', 'destroy']);
//     Route::apiResource('ratings', RatingController::class)->only(['index', 'store', 'show', 'destroy']);
// });

// Rute untuk admin
// Route::middleware('auth:sanctum', 'cekrole:admin')->group(function () {
    
// });