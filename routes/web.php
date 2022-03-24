<?php

use App\Http\Controllers\ScrapeController;
use App\Models\Merchant;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/merchant', function () {
    $name = Request::get('name') ?: '';

    $perPage = (int)Request::get('per_page') ?: 10;
    $filter = (object)[
        'per_page' => $perPage,
        'digital_platform' => Request::get('digital_platform') ?: 'semua',
        'status' => Request::get('status') ?: 'semua',
    ];

    return Inertia::render('Merchant/Index', [
        'merchants' => Merchant::where('name', 'like', '%'.$name.'%')->paginate($perPage),
        'filter' => $filter,
        'searched' => $name
    ]);
})->middleware(['auth', 'verified'])->name('merchant');

Route::post('/scrape', [ScrapeController::class, 'index'])->middleware(['auth', 'verified'])->name('scrape');

require __DIR__.'/auth.php';
