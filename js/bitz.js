'use strict';

//  ---------------------------------------------------------------------------

const Exchange = require ('./base/Exchange');
const { ExchangeError, ExchangeNotAvailable, PermissionDenied, InvalidOrder, AuthenticationError, InvalidNonce, InsufficientFunds, OrderNotFound, DDoSProtection } = require ('./base/errors');

//  ---------------------------------------------------------------------------

module.exports = class bitz extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'bitz',
            'name': 'Bit-Z',
            'countries': [ 'HK' ],
            'rateLimit': 2000,
            'version': 'v2',
            'userAgent': this.userAgents['chrome'],
            'has': {
                'fetchTickers': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
            },
            'timeframes': {
                '1m': '1min',
                '5m': '5min',
                '15m': '15min',
                '30m': '30min',
                '1h': '60min',
                '4h': '4hour',
                '1d': '1day',
                '5d': '5day',
                '1w': '1week',
                '1M': '1mon',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/35862606-4f554f14-0b5d-11e8-957d-35058c504b6f.jpg',
                'api': {
                    'market': 'https://apiv2.bitz.com',
                    'trade': 'https://apiv2.bitz.com',
                    'assets': 'https://apiv2.bitz.com',
                },
                'www': 'https://www.bit-z.com',
                'doc': 'https://www.bit-z.com/api.html',
                'fees': 'https://www.bit-z.com/about/fee',
            },
            'api': {
                'market': {
                    'get': [
                        'ticker',
                        'depth',
                        'order', // trades
                        'tickerall',
                        'kline',
                        'symbolList',
                        'currencyRate',
                        'currencyCoinRate',
                        'coinRate',
                    ],
                },
                'trade': {
                    'post': [
                        'addEntrustSheet',
                        'cancelEntrustSheet',
                        'cancelAllEntrustSheet',
                        'getUserHistoryEntrustSheet', // closed orders
                        'getUserNowEntrustSheet', // open orders
                        'getEntrustSheetInfo', // order
                    ],
                },
                'assets': {
                    'post': [
                        'getUserAssets',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.001,
                    'taker': 0.001,
                },
                'funding': {
                    'withdraw': {
                        'BTC': '0.5%',
                        'DKKT': '0.5%',
                        'ETH': 0.01,
                        'USDT': '0.5%',
                        'LTC': '0.5%',
                        'FCT': '0.5%',
                        'LSK': '0.5%',
                        'HXI': '0.8%',
                        'ZEC': '0.5%',
                        'DOGE': '0.5%',
                        'MZC': '0.5%',
                        'ETC': '0.5%',
                        'GXS': '0.5%',
                        'XPM': '0.5%',
                        'PPC': '0.5%',
                        'BLK': '0.5%',
                        'XAS': '0.5%',
                        'HSR': '0.5%',
                        'NULS': 5.0,
                        'VOISE': 350.0,
                        'PAY': 1.5,
                        'EOS': 0.6,
                        'YBCT': 35.0,
                        'OMG': 0.3,
                        'OTN': 0.4,
                        'BTX': '0.5%',
                        'QTUM': '0.5%',
                        'DASH': '0.5%',
                        'GAME': '0.5%',
                        'BCH': '0.5%',
                        'GNT': 9.0,
                        'SSS': 1500.0,
                        'ARK': '0.5%',
                        'PART': '0.5%',
                        'LEO': '0.5%',
                        'DGB': '0.5%',
                        'ZSC': 130.0,
                        'VIU': 350.0,
                        'BTG': '0.5%',
                        'ARN': 10.0,
                        'VTC': '0.5%',
                        'BCD': '0.5%',
                        'TRX': 200.0,
                        'HWC': '0.5%',
                        'UNIT': '0.5%',
                        'OXY': '0.5%',
                        'MCO': 0.3500,
                        'SBTC': '0.5%',
                        'BCX': '0.5%',
                        'ETF': '0.5%',
                        'PYLNT': 0.4000,
                        'XRB': '0.5%',
                        'ETP': '0.5%',
                    },
                },
            },
            'precision': {
                'amount': 8,
                'price': 8,
            },
            'options': {
                'fetchOHLCVVolume': true,
                'fetchOHLCVWarning': true,
                'lastNonceTimestamp': 0,
            },
            'commonCurrencies': {
                'XRB': 'NANO',
                'PXC': 'Pixiecoin',
            },
            'exceptions': {
                // '200': Success
                '-102': ExchangeError, // Invalid parameter
                '-103': AuthenticationError, // Verification failed
                '-104': ExchangeNotAvailable, // Network Error-1
                '-105': AuthenticationError, // Invalid api signature
                '-106': ExchangeNotAvailable, // Network Error-2
                '-109': AuthenticationError, // Invalid scretKey
                '-110': DDoSProtection, // The number of access requests exceeded
                '-111': PermissionDenied, // Current IP is not in the range of trusted IP
                '-112': ExchangeNotAvailable, // Service is under maintenance
                '-100015': AuthenticationError, // Trade password error
                '-100044': ExchangeError, // Fail to request data
                '-100101': ExchangeError, // Invalid symbol
                '-100201': ExchangeError, // Invalid symbol
                '-100301': ExchangeError, // Invalid symbol
                '-100401': ExchangeError, // Invalid symbol
                '-100302': ExchangeError, // Type of K-line error
                '-100303': ExchangeError, // Size of K-line error
                '-200003': AuthenticationError, // Please set trade password
                '-200005': PermissionDenied, // This account can not trade
                '-200025': ExchangeNotAvailable, // Temporary trading halt
                '-200027': InvalidOrder, // Price Error
                '-200028': InvalidOrder, // Amount must be greater than 0
                '-200029': InvalidOrder, // Number must be between %s and %d
                '-200030': InvalidOrder, // Over price range
                '-200031': InsufficientFunds, // Insufficient assets
                '-200032': ExchangeError, // System error. Please contact customer service
                '-200033': ExchangeError, // Fail to trade
                '-200034': OrderNotFound, // The order does not exist
                '-200035': OrderNotFound, // Cancellation error, order filled
                '-200037': InvalidOrder, // Trade direction error
                '-200038': ExchangeError, // Trading Market Error
                '-200055': OrderNotFound, // Order record does not exist
                '-300069': AuthenticationError, // api_key is illegal
                '-300101': ExchangeError, // Transaction type error
                '-300102': InvalidOrder, // Price or number cannot be less than 0
                '-300103': AuthenticationError, // Trade password error
                '-301001': ExchangeNotAvailable, // Network Error-3
            },
        });
    }

    async fetchMarkets () {
        let response = await this.marketGetSymbolList ();
        //
        //     {    status:    200,
        //             msg:   "",
        //            data: {   ltc_btc: {          id: "1",
        //                                        name: "ltc_btc",
        //                                    coinFrom: "ltc",
        //                                      coinTo: "btc",
        //                                 numberFloat: "4",
        //                                  priceFloat: "8",
        //                                      status: "1",
        //                                    minTrade: "0.010",
        //                                    maxTrade: "500000000.000" },
        //                    qtum_usdt: {          id: "196",
        //                                        name: "qtum_usdt",
        //                                    coinFrom: "qtum",
        //                                      coinTo: "usdt",
        //                                 numberFloat: "4",
        //                                  priceFloat: "2",
        //                                      status: "1",
        //                                    minTrade: "0.100",
        //                                    maxTrade: "500000000.000" },  },
        //            time:    1535969146,
        //       microtime:   "0.66955600 1535969146",
        //          source:   "api"                                           }
        //
        let markets = response['data'];
        let ids = Object.keys (markets);
        let result = [];
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];
            let market = markets[id];
            let numericId = this.safeString (market, 'id');
            let baseId = this.safeString (market, 'coinFrom');
            let quoteId = this.safeString (market, 'coinTo');
            let base = baseId.toUpperCase ();
            let quote = quoteId.toUpperCase ();
            base = this.commonCurrencyCode (base);
            quote = this.commonCurrencyCode (quote);
            let symbol = base + '/' + quote;
            let precision = {
                'amount': this.safeInteger (market, 'numberFloat'),
                'price': this.safeInteger (market, 'priceFloat'),
            };
            result.push ({
                'info': market,
                'id': id,
                'numericId': numericId,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'baseId': baseId,
                'quoteId': quoteId,
                'active': true,
                'precision': precision,
                'limits': {
                    'amount': {
                        'min': this.safeFloat (market, 'minTrade'),
                        'max': this.safeFloat (market, 'maxTrade'),
                    },
                    'price': {
                        'min': Math.pow (10, -precision['price']),
                        'max': undefined,
                    },
                    'cost': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
            });
        }
        return result;
    }

    async fetchBalance (params = {}) {
        await this.loadMarkets ();
        let response = await this.privatePostBalances (params);
        let data = response['data'];
        let balances = this.omit (data, 'uid');
        let result = { 'info': response };
        let keys = Object.keys (balances);
        for (let i = 0; i < keys.length; i++) {
            let id = keys[i];
            let idHasUnderscore = (id.indexOf ('_') >= 0);
            if (!idHasUnderscore) {
                let code = id.toUpperCase ();
                if (id in this.currencies_by_id) {
                    code = this.currencies_by_id[id]['code'];
                }
                let account = this.account ();
                let usedField = id + '_lock';
                account['used'] = this.safeFloat (balances, usedField);
                account['total'] = this.safeFloat (balances, id);
                account['free'] = account['total'] - account['used'];
                result[code] = account;
            }
        }
        return this.parseBalance (result);
    }

    parseTicker (ticker, market = undefined) {
        //
        //      {          symbol: "eth_btc",
        //            quoteVolume: "3905.72",
        //                 volume: "97058.21",
        //            priceChange: "-1.72",
        //         priceChange24h: "-1.65",
        //               askPrice: "0.03971272",
        //                 askQty: "0.0663",
        //               bidPrice: "0.03961469",
        //                 bidQty: "19.5451",
        //                   open: "0.04036769",
        //                   high: "0.04062988",
        //                    low: "0.03956123",
        //                    now: "0.03970100",
        //                firstId:  115567767,
        //                 lastId:  115795316,
        //              dealCount:  14078,
        //        numberPrecision:  4,
        //         pricePrecision:  8,
        //                    cny: "1959.05",
        //                    usd: "287.10",
        //                    krw: "318655.82"   }
        //
        let timestamp = undefined;
        let symbol = undefined;
        if (typeof market === 'undefined') {
            let marketId = this.safeString (ticker, 'symbol');
            market = this.safeValue (this.markets_by_id, marketId);
        }
        if (typeof market !== 'undefined') {
            symbol = market['symbol'];
        }
        let last = this.safeFloat (ticker, 'now');
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeFloat (ticker, 'high'),
            'low': this.safeFloat (ticker, 'low'),
            'bid': this.safeFloat (ticker, 'bidPrice'),
            'bidVolume': this.safeFloat (ticker, 'bidQty'),
            'ask': this.safeFloat (ticker, 'askPrice'),
            'askVolume': this.safeFloat (ticker, 'askQty'),
            'vwap': undefined,
            'open': this.safeFloat (ticker, 'open'),
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': this.safeFloat (ticker, 'priceChange24h'),
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeFloat (ticker, 'volume'),
            'quoteVolume': this.safeFloat (ticker, 'quoteVolume'),
            'info': ticker,
        };
    }

    parseMicrotime (microtime) {
        if (typeof microtime === 'undefined') {
            return microtime;
        };
        let parts = microtime.split (' ');
        let milliseconds = parseFloat (parts[0]);
        let seconds = parseInt (parts[1]);
        let total = seconds + milliseconds;
        return parseInt (total * 1000);
    }

    async fetchTicker (symbol, params = {}) {
        await this.loadMarkets ();
        let market = this.market (symbol);
        let response = await this.marketGetTicker (this.extend ({
            'symbol': market['id'],
        }, params));
        //
        //     {    status:    200,
        //             msg:   "",
        //            data: {          symbol: "eth_btc",
        //                        quoteVolume: "3905.72",
        //                             volume: "97058.21",
        //                        priceChange: "-1.72",
        //                     priceChange24h: "-1.65",
        //                           askPrice: "0.03971272",
        //                             askQty: "0.0663",
        //                           bidPrice: "0.03961469",
        //                             bidQty: "19.5451",
        //                               open: "0.04036769",
        //                               high: "0.04062988",
        //                                low: "0.03956123",
        //                                now: "0.03970100",
        //                            firstId:  115567767,
        //                             lastId:  115795316,
        //                          dealCount:  14078,
        //                    numberPrecision:  4,
        //                     pricePrecision:  8,
        //                                cny: "1959.05",
        //                                usd: "287.10",
        //                                krw: "318655.82"   },
        //            time:    1535970397,
        //       microtime:   "0.76341900 1535970397",
        //          source:   "api"                             }
        //
        const ticker = this.parseTicker (response['data'], market);
        let timestamp = this.parseMicrotime (this.safeString (response, 'microtime'));
        return this.extend (ticker, {
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
        });
    }

    async fetchTickers (symbols = undefined, params = {}) {
        await this.loadMarkets ();
        let request = {};
        if (typeof symbols !== 'undefined') {
            let ids = this.marketIds (symbols);
            request['symbols'] = ids.join (',');
        }
        let response = await this.marketGetTickerall (this.extend (request, params));
        //
        //     {    status:    200,
        //             msg:   "",
        //            data: {   ela_btc: {          symbol: "ela_btc",
        //                                     quoteVolume: "0.00",
        //                                          volume: "3.28",
        //                                     priceChange: "0.00",
        //                                  priceChange24h: "0.00",
        //                                        askPrice: "0.00147984",
        //                                          askQty: "5.4580",
        //                                        bidPrice: "0.00120230",
        //                                          bidQty: "12.5384",
        //                                            open: "0.00149078",
        //                                            high: "0.00149078",
        //                                             low: "0.00149078",
        //                                             now: "0.00149078",
        //                                         firstId:  115581219,
        //                                          lastId:  115581219,
        //                                       dealCount:  1,
        //                                 numberPrecision:  4,
        //                                  pricePrecision:  8,
        //                                             cny: "73.66",
        //                                             usd: "10.79",
        //                                             krw: "11995.03"    }     },
        //            time:    1535971578,
        //       microtime:   "0.39854200 1535971578",
        //          source:   "api"                                                }
        //
        let tickers = response['data'];
        let timestamp = this.parseMicrotime (this.safeString (response, 'microtime'));
        let iso8601 = this.iso8601 (timestamp);
        let result = {};
        let ids = Object.keys (tickers);
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];
            let ticker = tickers[id];
            let market = undefined;
            if (id in this.markets_by_id) {
                market = this.markets_by_id[id];
            }
            ticker = this.parseTicker (tickers[id], market);
            let symbol = ticker['symbol'];
            if (typeof symbol === 'undefined') {
                if (typeof market !== 'undefined') {
                    symbol = market['symbol'];
                } else {
                    let [ baseId, quoteId ] = id.split ('_');
                    let base = baseId.toUpperCase ();
                    let quote = quoteId.toUpperCase ();
                    base = this.commonCurrencyCode (baseId);
                    quote = this.commonCurrencyCode (quoteId);
                    symbol = base + '/' + quote;
                }
            }
            if (typeof symbol !== 'undefined') {
                result[symbol] = this.extend (ticker, {
                    'timestamp': timestamp,
                    'datetime': iso8601,
                });
            }
        }
        return result;
    }

    async fetchOrderBook (symbol, limit = undefined, params = {}) {
        await this.loadMarkets ();
        let response = await this.marketGetDepth (this.extend ({
            'symbol': this.marketId (symbol),
        }, params));
        //
        //     {    status:    200,
        //             msg:   "",
        //            data: {     asks: [ ["10.00000000", "0.4426", "4.4260"],
        //                                ["1.00000000", "0.8339", "0.8339"],
        //                                ["0.91700000", "0.0500", "0.0458"],
        //                                ["0.20000000", "0.1000", "0.0200"],
        //                                ["0.03987120", "16.1262", "0.6429"],
        //                                ["0.03986120", "9.7523", "0.3887"]   ],
        //                        bids: [ ["0.03976145", "0.0359", "0.0014"],
        //                                ["0.03973401", "20.9493", "0.8323"],
        //                                ["0.03967970", "0.0328", "0.0013"],
        //                                ["0.00000002", "10000.0000", "0.0002"],
        //                                ["0.00000001", "231840.7500", "0.0023"] ],
        //                    coinPair:   "eth_btc"                                  },
        //            time:    1535974778,
        //       microtime:   "0.04017400 1535974778",
        //          source:   "api"                                                     }
        //
        let orderbook = response['data'];
        let timestamp = this.parseMicrotime (this.safeString (response, 'microtime'));
        return this.parseOrderBook (orderbook, timestamp);
    }

    parseTrade (trade, market = undefined) {
        //
        // fetchTrades (public)
        //
        //    { id:  115807453,
        //       t: "19:36:24",
        //       T:  1535974584,
        //       p: "0.03983296",
        //       n: "0.1000",
        //       s: "buy"         },
        //
        let id = this.safeString (trade, 'id');
        let timestamp = this.safeInteger (trade, 'T');
        if (typeof timestamp !== 'undefined') {
            timestamp = timestamp * 1000;
        }
        let price = this.safeFloat (trade, 'p');
        let amount = this.safeFloat (trade, 'n');
        let symbol = undefined;
        if (typeof market !== 'undefined') {
            symbol = market['symbol'];
        }
        let cost = this.priceToPrecision (symbol, amount * price);
        let side = this.safeString (trade, 's');
        return {
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': symbol,
            'id': id,
            'order': undefined,
            'type': 'limit',
            'side': side,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': undefined,
            'info': trade,
        };
    }

    async fetchTrades (symbol, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        let market = this.market (symbol);
        let response = await this.marketGetOrder (this.extend ({
            'symbol': market['id'],
        }, params));
        //
        //     {    status:    200,
        //             msg:   "",
        //            data: [ { id:  115807453,
        //                       t: "19:36:24",
        //                       T:  1535974584,
        //                       p: "0.03983296",
        //                       n: "0.1000",
        //                       s: "buy"         },
        //                    { id:  115806811,
        //                       t: "19:33:19",
        //                       T:  1535974399,
        //                       p: "0.03981135",
        //                       n: "9.4612",
        //                       s: "sell"        }  ],
        //            time:    1535974583,
        //       microtime:   "0.57118100 1535974583",
        //          source:   "api"                     }
        //
        return this.parseTrades (response['data'], market, since, limit);
    }

    parseOHLCV (ohlcv, market = undefined, timeframe = '1m', since = undefined, limit = undefined) {
        //
        //      {     time: "1535973420000",
        //            open: "0.03975084",
        //            high: "0.03975084",
        //             low: "0.03967700",
        //           close: "0.03967700",
        //          volume: "12.4733",
        //        datetime: "2018-09-03 19:17:00" }
        //
        return [
            this.safeInteger (ohlcv, 'time'),
            this.safeFloat (ohlcv, 'open'),
            this.safeFloat (ohlcv, 'high'),
            this.safeFloat (ohlcv, 'low'),
            this.safeFloat (ohlcv, 'close'),
            this.safeFloat (ohlcv, 'volume'),
        ];
    }

    async fetchOHLCV (symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        let duration = this.parseTimeframe (timeframe) * 1000;
        let market = this.market (symbol);
        let request = {
            'symbol': market['id'],
            'resolution': this.timeframes[timeframe],
        };
        if (typeof limit !== 'undefined') {
            request['size'] = Math.min (limit, 300); // 1-300
            if (typeof since !== 'undefined') {
                request['to'] = since + limit * duration * 1000;
            }
        } else {
            if (typeof since !== 'undefined') {
                throw new ExchangeError (this.id + ' fetchOHLCV requires a since argument to be supplied along with the limit argument');
            }
        }
        let response = await this.marketGetKline (this.extend (request, params));
        //
        //     {    status:    200,
        //             msg:   "",
        //            data: {       bars: [ {     time: "1535973420000",
        //                                        open: "0.03975084",
        //                                        high: "0.03975084",
        //                                         low: "0.03967700",
        //                                       close: "0.03967700",
        //                                      volume: "12.4733",
        //                                    datetime: "2018-09-03 19:17:00" },
        //                                  {     time: "1535955480000",
        //                                        open: "0.04009900",
        //                                        high: "0.04016745",
        //                                         low: "0.04009900",
        //                                       close: "0.04012074",
        //                                      volume: "74.4803",
        //                                    datetime: "2018-09-03 14:18:00" }  ],
        //                    resolution:   "1min",
        //                        symbol:   "eth_btc",
        //                          from:   "1535973420000",
        //                            to:   "1535955480000",
        //                          size:    300                                    },
        //            time:    1535973435,
        //       microtime:   "0.56462100 1535973435",
        //          source:   "api"                                                    }
        //
        return this.parseOHLCVs (response['data']['bars'], market, timeframe, since, limit);
    }

    parseOrder (order, market = undefined) {
        let symbol = undefined;
        if (typeof market !== 'undefined')
            symbol = market['symbol'];
        let side = this.safeString (order, 'side');
        if (typeof side === 'undefined') {
            side = this.safeString (order, 'type');
            if (typeof side !== 'undefined')
                side = (side === 'in') ? 'buy' : 'sell';
            if (typeof side === 'undefined')
                side = this.safeString (order, 'flag');
        }
        let amount = this.safeFloat (order, 'number');
        let remaining = this.safeFloat (order, 'numberover');
        let filled = undefined;
        if (typeof amount !== 'undefined')
            if (typeof remaining !== 'undefined')
                filled = amount - remaining;
        let timestamp = undefined;
        let iso8601 = undefined;
        if ('datetime' in order) {
            timestamp = this.parse8601 (order['datetime']);
            iso8601 = this.iso8601 (timestamp);
        }
        return {
            'id': order['id'],
            'datetime': iso8601,
            'timestamp': timestamp,
            'lastTradeTimestamp': undefined,
            'status': 'open',
            'symbol': symbol,
            'type': 'limit',
            'side': side,
            'price': order['price'],
            'cost': undefined,
            'amount': order['number'],
            'filled': filled,
            'remaining': remaining,
            'trades': undefined,
            'fee': undefined,
            'info': order,
        };
    }

    async createOrder (symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets ();
        let market = this.market (symbol);
        let orderType = (side === 'buy') ? 'in' : 'out';
        if (!this.password)
            throw new ExchangeError (this.id + ' createOrder() requires you to set exchange.password = "YOUR_TRADING_PASSWORD" (a trade password is NOT THE SAME as your login password)');
        let request = {
            'coin': market['id'],
            'type': orderType,
            'price': this.priceToPrecision (symbol, price),
            'number': this.amountToString (symbol, amount),
            'tradepwd': this.password,
        };
        let response = await this.privatePostTradeAdd (this.extend (request, params));
        let id = response['data']['id'];
        let order = this.parseOrder ({
            'id': id,
            'price': price,
            'number': amount,
            'side': side,
        }, market);
        this.orders[id] = order;
        return order;
    }

    async cancelOrder (id, symbol = undefined, params = {}) {
        await this.loadMarkets ();
        let response = await this.privatePostTradeCancel (this.extend ({
            'id': id,
        }, params));
        return response;
    }

    async fetchOpenOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        let market = this.market (symbol);
        let response = await this.privatePostOpenOrders (this.extend ({
            'coin': market['id'],
        }, params));
        return this.parseOrders (response['data'], market, since, limit);
    }

    nonce () {
        let currentTimestamp = this.seconds ();
        if (currentTimestamp > this.options['lastNonceTimestamp']) {
            this.options['lastNonceTimestamp'] = currentTimestamp;
            this.options['lastNonce'] = 100000;
        }
        this.options['lastNonce'] = this.sum (this.options['lastNonce'], 1);
        return this.options['lastNonce'];
    }

    sign (path, api = 'market', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = this.urls['api'][api] + '/' + this.capitalize (api) + '/' + path;
        let query = undefined;
        if (api === 'market') {
            query = this.urlencode (params);
            if (query.length)
                url += '?' + query;
        } else {
            this.checkRequiredCredentials ();
            body = this.urlencode (this.keysort (this.extend ({
                'api_key': this.apiKey,
                'timestamp': this.seconds (),
                'nonce': this.nonce (),
            }, params)));
            body += '&sign=' + this.hash (this.encode (body + this.secret));
            headers = { 'Content-type': 'application/x-www-form-urlencoded' };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    handleErrors (httpCode, reason, url, method, headers, body) {
        if (typeof body !== 'string')
            return; // fallback to default error handler
        if (body.length < 2)
            return; // fallback to default error handler
        if ((body[0] === '{') || (body[0] === '[')) {
            let response = JSON.parse (body);
            let status = this.safeString (response, 'status');
            if (typeof status !== 'undefined') {
                //
                //     {"status":-107,"msg":"","data":"","time":1535968848,"microtime":"0.89092200 1535968848","source":"api"}
                //
                if (status === '200')
                    return; // no error
                const feedback = this.id + ' ' + body;
                const exceptions = this.exceptions;
                if (status in exceptions) {
                    throw new exceptions[status] (feedback);
                } else {
                    throw new ExchangeError (feedback);
                }
            }
        }
    }
};
