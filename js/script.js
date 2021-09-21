// const and variables
const BASE_URL = 'https://api.coingecko.com/api/v3/simple/price'
const HIST_PRICE_API = 'https://api.coingecko.com/api/v3/coins/'
const bitcoinPrice = $.ajax('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')

let currentPrice = ''
let historicalPrice = ''


// Setting temporary variables from the form
let assetSelected = 'bitcoin';
let amountSelected = 1000;
let dateSelected = '30-12-2017'

// Functions

// Bitcoin Current price
$.ajax(`${BASE_URL}?ids=${assetSelected}&vs_currencies=usd`).then(function(data) {
    currentPrice = data;
    console.log(currentPrice.bitcoin.usd);
}, function(error){
    console.log(error);
});


// Bitcoin historical price
$.ajax(`${HIST_PRICE_API}${assetSelected}/history?date=${dateSelected}`).then(function(data) {
    historicalPrice = data
    console.log(historicalPrice.market_data.current_price.usd);
}, function(error){
    console.log(error);
});

