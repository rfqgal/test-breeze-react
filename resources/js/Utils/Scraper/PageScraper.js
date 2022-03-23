const { crawlBukalapak, bukalapakHeader } = require('./Web/Bukalapak');

const scraperObject = {
  url: 'https://www.bukalapak.com/im3-ooredoo-official',
  async scraper(browser){
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    // Wait for the required DOM to be rendered
    // await page.waitForSelector('.seller-catalog-products'); BLIBLI
    await page.waitForSelector('#merchant-page');

    // BUKALAPAK
    const names = await page.$$eval(bukalapakHeader, crawlBukalapak);
    console.log(names); 
  }
};

module.exports = scraperObject;
    
// // BASE FUNCTION
// let urls = await page.$$eval('section ol > li', links => {
//   // Make sure the book to be scraped is in stock
//   links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== 'In stock');
//   // Extract the links from the data
//   links = links.map(el => el.querySelector('h3 > a').href);
//   return links;
// });
// console.log(urls);

// // BLIBLI
// let names = await page.$$eval('div.product.columns', items => {
//   // Make sure the book to be scraped is in stock
//   // items = items.filter(link => link.querySelector('.instock.availability > i').textContent !== 'In stock');
//   // Extract the names from the data
//   items = items.map(el => el.querySelector('div.product__content > div.product__title').title);
//   return items;
// });