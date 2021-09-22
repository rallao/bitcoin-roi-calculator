// const and variables
const CURRENT_PRICE_API_URL = 'https://api.coingecko.com/api/v3/simple/price'
const HIST_PRICE_API_URL = 'https://api.coingecko.com/api/v3/coins/'

let currentPrice = ''
let historicalPrice = ''

const $form = $('form');
const $input = $('input');

// Setting temporary variables from the form
let assetSelected = 'bitcoin';
let amountSelected = 1000;
let dateSelected = '30-12-2018'

// Functions

// Bitcoin Current price
$.ajax(`${CURRENT_PRICE_API_URL}?ids=${assetSelected}&vs_currencies=usd`).then(function(data) {
    currentPrice = data;
    console.log(currentPrice.bitcoin.usd);
}, function(error){
    console.log(error);
});


// Bitcoin historical price
$.ajax(`${HIST_PRICE_API_URL}${assetSelected}/history?date=${dateSelected}`).then(function(data) {
    historicalPrice = data
    console.log(historicalPrice.market_data.current_price.usd);
}, function(error){
    console.log(error);
});


function handleGetData (event){
    event.preventDefault();
    const amountSelected = $("#amount-data").val();
    const dateSelected = $("#date-data").val();
    const assetSelected = $("#asset-data").val();
    console.log(amountSelected + dateSelected + assetSelected);
}


$form.on('submit', handleGetData);
//TODO: change the 'selected' variables to the input form
//TODO: Build a function that calculate = (currentPrice / historicalPrice)/historicalPrice
    // returnOverInvestment = ((current_price / historicalPrice) / historicalPrice)*100
    // console.log(returnOverInvestment);