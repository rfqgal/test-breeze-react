<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Nesk\Puphpeteer\Puppeteer;
use Nesk\Rialto\Data\JsFunction;

class ScrapeController extends Controller
{
    public function index(Request $request)
    {
        $url = $request->url;

        if (!str_contains($url, 'https://')) {
            $url = 'https://'.$url;
        }

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
        // printf('Dimensions: %s', print_r($dimensions, true));
        return response([
            'url' => $url,
            'dimensions' => $dimensions
        ]);

        $browser->close();
    }
}
