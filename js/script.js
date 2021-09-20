// const and variables
const bitcoinPrice = $.ajax('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')

console.log(bitcoinPrice);

//$.ajax('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd').then(function(data) {
//    console.log(data)
//}) ;