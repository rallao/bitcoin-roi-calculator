// const and variables

const BASE_URL = 'https://api.coingecko.com/api/v3/simple/price'
const bitcoinPrice = $.ajax('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')

let currentPrice = ''
let historicalPrice = ''



// Functions

// Bitcoin Current price
$.ajax('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd').then(function(data) {
    currentPrice = data;
    console.log(currentPrice.bitcoin.usd);
}, function(error){
    console.log(error);
});


// Bitcoin historical price
$.ajax('https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2017').then(function(data) {
    historicalPrice = data
    console.log(historicalPrice.market_data.current_price.usd);
}, function(error){
    console.log(error);
});