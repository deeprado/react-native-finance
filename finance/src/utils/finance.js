export function getStock(opts, type) {
  const defs = {
    baseURL: 'https://query.yahooapis.com/v1/public/yql?q=',
    query: {
      quotes: 'select * from yahoo.finance.quotes where symbol in ("{stock}")',
      historicaldata:
        'select * from yahoo.finance.historicaldata where symbol = "{stock}" and startDate = "{startDate}" and endDate = "{endDate}"',
    },
    suffixURL: {
      quotes:
        '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
      historicaldata:
        '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
    },
  };

  opts = opts || {};

  if (!opts.stock) {
    return;
  }

  if (opts.stock instanceof Array) {
    opts.stock = opts.stock.join("', '");
  }

  const query = defs.query[type]
    .replace('{stock}', opts.stock)
    .replace('{startDate}', opts.startDate)
    .replace('{endDate}', opts.endDate);

  const url = defs.baseURL + query + (defs.suffixURL[type] || '');
  console.log(url);
  return fetch(url);
}

export const properties = [
  'AfterHoursChangeRealtime',
  'AnnualizedGain',
  'Ask',
  'AskRealtime',
  'AverageDailyVolume',
  'Bid',
  'BidRealtime',
  'BookValue',
  'Change',
  'ChangeFromFiftydayMovingAverage',
  'ChangeFromTwoHundreddayMovingAverage',
  'ChangeFromYearHigh',
  'ChangeFromYearLow',
  'ChangePercentRealtime',
  'ChangeRealtime',
  'Change_PercentChange',
  'ChangeinPercent',
  'Commission',
  'Currency',
  'DaysHigh',
  'DaysLow',
  'DaysRange',
  'DaysRangeRealtime',
  'DaysValueChange',
  'DaysValueChangeRealtime',
  'DividendPayDate',
  'DividendShare',
  'DividendYield',
  'EBITDA',
  'EPSEstimateCurrentYear',
  'EPSEstimateNextQuarter',
  'EPSEstimateNextYear',
  'EarningsShare',
  'ErrorIndicationreturnedforsymbolchangedinvalid',
  'ExDividendDate',
  'FiftydayMovingAverage',
  'HighLimit',
  'HoldingsGain',
  'HoldingsGainPercent',
  'HoldingsGainPercentRealtime',
  'HoldingsGainRealtime',
  'HoldingsValue',
  'HoldingsValueRealtime',
  'LastTradeDate',
  'LastTradePriceOnly',
  'LastTradeRealtimeWithTime',
  'LastTradeTime',
  'LastTradeWithTime',
  'LowLimit',
  'MarketCapRealtime',
  'MarketCapitalization',
  'MoreInfo',
  'Name',
  'Notes',
  'OneyrTargetPrice',
  'Open',
  'OrderBookRealtime',
  'PEGRatio',
  'PERatio',
  'PERatioRealtime',
  'PercebtChangeFromYearHigh',
  'PercentChange',
  'PercentChangeFromFiftydayMovingAverage',
  'PercentChangeFromTwoHundreddayMovingAverage',
  'PercentChangeFromYearLow',
  'PreviousClose',
  'PriceBook',
  'PriceEPSEstimateCurrentYear',
  'PriceEPSEstimateNextYear',
  'PricePaid',
  'PriceSales',
  'SharesOwned',
  'ShortRatio',
  'StockExchange',
  'Symbol',
  'TickerTrend',
  'TradeDate',
  'TwoHundreddayMovingAverage',
  'Volume',
  'YearHigh',
  'YearLow',
  'YearRange',
];

export function getNews(symbol) {
  const url = `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${symbol}&region=US&lang=en-US`;
  console.log(url);
  return fetch(url) // eslint-disable-line no-undef
    .then(response => response.text())
    .catch(err => console.error(err));
}

export function symbolSuggest(query) {
  const url = `http://d.yimg.com/aq/autoc?query=${query}&region=US&lang=en-US&callback=YAHOO.util.ScriptNodeDataSource.callbacks`;
  return fetch(url).catch(err => console.error(err)); // eslint-disable-line no-undef
}
