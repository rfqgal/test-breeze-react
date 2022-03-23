export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function urlParamFinder(url, param) {
  param = param + '=';

  if (url.substring(url.lastIndexOf(param) + param.length).includes('&')) {
    let filterred = url;

    do {
      filterred = filterred.substring(filterred.lastIndexOf(param), filterred.lastIndexOf('&'));  
    } 
    while (filterred.substring(filterred.lastIndexOf(param) + param.length).includes('&'));

    return filterred;
  }
  return url.substring(url.lastIndexOf(param));
}

export function addUrlParam(url, param, data) {
  if (url.includes(param)) {
    data = param + '=' + data;
    return url.replace(urlParamFinder(url, param), data);
  }
  else {
    return url.includes('?') ? `${url}&${param}=${data}` : `${url}?${param}=${data}`;
  }
}
