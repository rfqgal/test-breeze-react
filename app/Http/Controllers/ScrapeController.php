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
            $url = 'https://'.$url.'/';
        }

        $browserInstance = $this->browser();
        $scraperController = $this->controller($browserInstance, $url);

        return response([
            'url' => $url,
            'result' => $scraperController
        ]);
    }

    public function browser()
    {
        $puppeteer = new Puppeteer();
        $browser = null;
        try {
            $browser = $puppeteer->launch([
                'args' => ['--disable-setuid-sandbox'],
                'ignoreHTTPSErrors' => true
            ]);
        } catch (\Throwable $th) {
            return response([
                'error' => 'Could not create a browser instance => '.$th
            ], 500);
        }
        return $browser;
    }
    
    public function controller($browserInstance, $url)
    {
        $res = null;
        try {
            $browser = $browserInstance;
            $res = $this->scraper($browser, $url);
        } catch (\Throwable $th) {
            return response([
                'error' => 'Could not resolve the browser instance => '.$th
            ], 500);
        }
        return $res;
    }

    public function scraper($browser, $url)
    {
        $page = $browser->newPage();
        $page->goto($url);

        $names = $page->querySelectorAllEval('section ol > li', JsFunction::createWithParameters(['titles'])->body("
            return {
                titles: titles.map(el => el.querySelector('h3 > a').title)
            };
        "));
        return $names;
    }

    public function example(Request $request)
    {
        $url = $request->url;

        if (!str_contains($url, 'https://')) {
            $url = 'https://'.$url;
        }

        $puppeteer = new Puppeteer();
        $browser = $puppeteer->launch();

        $page = $browser->newPage();
        $page->goto($url);
        // $page->screenshot(['path' => 'example.png']);

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
