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
        $url = !str_contains($url, 'https://' || 'http://') ? 'https://'.$url.'/' : $url;

        $browserInstance = $this->browser();
        $scraperController = $this->controller($browserInstance, $url);

        return response([
            // 'url' => $url,
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
        $list = 'section div.o-layout.o-layout--responsive > div.o-layout__item';
        $itemIdx = 'div.c-product-card-description > a';
        
        $res = null;
        try {
            $browser = $browserInstance;
            $res = $this->scraper($browser, $url, $list, $itemIdx);
        } catch (\Throwable $th) {
            return response([
                'error' => 'Could not resolve the browser instance => '.$th
            ], 500);
        }
        return $res;
    }

    public function scraper($browser, $url, $list = 'section ol > li', $itemIdx = 'h3 > a')
    {
        $page = $browser->newPage();
        $page->goto($url);

        $names = $page->querySelectorAllEval($list, JsFunction::createWithParameters(['titles', 'url', 'itemIdx'])->body("
            return {
                url,
                titles: titles.map(el => el.querySelector(itemIdx).title)
            };
        "), $url, $itemIdx);
        return $names;
    }
}
