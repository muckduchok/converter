export function currenciesHandler(currenciesArr, current) {
  let currencies = currenciesArr;
  for (let key in currencies.rates) {
    if (currencies.rates[key] !== null) {
      if (key === current.rate) {
        currencies.rates[key] = currencies.rates[key].toFixed(0)
      } else {
        currencies.rates[key] = currencies.rates[key].toFixed(2)
      }
    }
  }
  return currencies;
}