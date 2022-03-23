const bukalapakHeader = 'section div.o-layout.o-layout--responsive > div.o-layout__item';
const crawlBukalapak = items => {
  items = items.map(el => el.querySelector('div.c-product-card-description > a').title);
  return items;
};

module.exports = { bukalapakHeader, crawlBukalapak};