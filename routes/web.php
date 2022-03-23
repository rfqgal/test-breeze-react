<?php

use App\Models\Merchant;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Nesk\Puphpeteer\Puppeteer;
use Nesk\Rialto\Data\JsFunction;

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

Route::post('/scrape', function () {
    $url = Request::post('url');

    $puppeteer = new Puppeteer;
    $browser = $puppeteer->launch();

    $page = $browser->newPage();
    $page->goto($url);
    $page->screenshot(['path' => 'example.png']);

    // Get the "viewport" of the page, as reported by the page.
    $dimensions = $page->evaluate(JsFunction::create("
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    "));
    printf('Dimensions: %s', print_r($dimensions, true));

    $browser->close();
})->middleware(['auth', 'verified'])->name('scrape');

require __DIR__.'/auth.php';
