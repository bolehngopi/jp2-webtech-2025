<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ScheduleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::prefix('auth')
        ->controller(AuthController::class)
        ->group(function () {
            Route::post('/login', 'login');
            Route::post('/logout', 'logout')->middleware('auth:sanctum');
        });

    Route::prefix('department')
        ->middleware('auth:sanctum')
        ->controller(DepartmentController::class)
        ->group(function () {
            Route::post('/', 'store');
            Route::get('/', 'index');
            Route::put('/{department}', 'update')->missing(function () {
                return response()->json([
                    "message" => "Department not found"
                ], 404);
            });
            Route::get('/{department}', 'show')->missing(function () {
                return response()->json([
                    "message" => "Department not found"
                ], 404);
            });
            Route::delete('/{department}', 'destroy')->missing(function () {
                return response()->json([
                    "message" => "Department not found"
                ], 404);
            });;
        });

    Route::prefix('doctor')
        ->middleware('auth:sanctum')
        ->controller(DoctorController::class)
        ->group(function () {
            Route::post('/', 'store');
            Route::get('/', 'index');
            Route::put('/{doctor:id}', 'update')->missing(function () {
                return response()->json([
                    "message" => "Doctor not found"
                ], 404);
            });
            Route::get('/{doctor}', 'show')->missing(function () {
                return response()->json([
                    "message" => "Doctor not found"
                ], 404);
            });
            Route::delete('/{doctor}', 'destroy')->missing(function () {
                return response()->json([
                    "message" => "Doctor not found"
                ], 404);
            });;
        });

    Route::prefix('schedule')
        ->middleware('auth:sanctum')
        ->controller(ScheduleController::class)
        ->group(function () {
            Route::post('/', 'store');
            Route::get('/', 'index');
            Route::get('/{schedule}', 'show')->missing(function () {
                return response()->json([
                    "message" => "Schedule not found"
                ], 404);
            });;
            Route::put('/{schedule}', 'update')->missing(function () {
                return response()->json([
                    "message" => "Schedule not found"
                ], 404);
            });;
            Route::delete('/{schedule}', 'destroy')->missing(function () {
                return response()->json([
                    "message" => "Schedule not found"
                ], 404);
            });;
        });
});
