<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Nesk\Puphpeteer\Puppeteer;
use Nesk\Rialto\Data\JsFunction;

class ScrapeController extends Controller
{
    private $websites = [
        'bukalapak.com' => [
            'list' => 'section div.o-layout.o-layout--responsive > div.o-layout__item',
            'itemIdx' => 'div.c-product-card-description > a',
        ],
        'shopee.co.id' => [
            'list' => 'div.shop-page div.row > div.shop-search-result-view__item',
            'itemIdx' => 'a div._1sRyv_._2j2K92._3j20V6'
        ],
        // Error (tracked bot?)
        'lazada.co.id' => [
            'list' => '#root div._17mcb > div.Bm3ON',
            'itemIdx' => 'div.RfADt > a'
        ],
        // Error (error when headless)
        'tokopedia.com' => [
            'list' => '#zeus-root div.css-tjjb18 > div',
            'itemIdx' => 'a.pcv3__info-content.css-gwkf0u > div'
        ],
        'jd.id' => [
            'list' => '.layout-main div.goods-list > div.good.J_goodItem',
            'itemIdx' => 'div.name > a'
        ],
    ];
    
    public function index(Request $request)
    {
        $url = $request->url;
        // $url = !str_contains($url, 'https://' || 'http://') ? 'https://'.$url.'/' : $url;

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
                // 'headless' => false,
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
        $parsed_url = parse_url($url);
        $domain = str_replace('www.', '', $parsed_url['host']);
        
        $list = $this->websites[$domain]['list'];
        $itemIdx = $this->websites[$domain]['itemIdx'];
        
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
        $parsed_url = parse_url($url);

        $page = $browser->newPage();
        $page->goto($url);
        // $page->setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
        // $page->waitForSelector($list);

        $names = $page->querySelectorAllEval($list, JsFunction::createWithParameters(['titles', 'parsed_url', 'itemIdx'])->body("
            return {
                parsed_url,
                titles: titles.map(el => el.querySelector(itemIdx).innerHTML)
            };
        "), $parsed_url, $itemIdx);
        return $names;
    }
}
