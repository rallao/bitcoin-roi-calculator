// const and variables
const CURRENT_PRICE_API_URL = 'https://api.coingecko.com/api/v3/simple/price'
const HIST_PRICE_API_URL = 'https://api.coingecko.com/api/v3/coins/'

let currentPrice = ''
let historicalPrice = ''

const $form = $('form');
const $input = $('input');

// Setting temporary variables from the form
var assetSelected;
var amountSelected;
var dateSelected; //date format dd-mm-yyyy to api works

// Functions


// Event listener when user click button
function handleGetData (event){
    event.preventDefault();
    amountSelected = $("#amount-data").val();
    assetSelected = $("#asset-data").val();
    dateSelected = $("#date-data").val();
    // format date to api requirimements dd-mm-yyy
    dateSelected = dateSelected.split("-").reverse().join("-")

    // console.log updated variables.
    console.log(amountSelected);
    console.log(dateSelected);
    console.log(assetSelected);

    // call the functions that fetch the data.
    getHistoricalPrice();
    getCurrentPrice();
}
// Bitcoin Current price
function getCurrentPrice() {$.ajax(`${CURRENT_PRICE_API_URL}?ids=${assetSelected}&vs_currencies=usd`).then(function(data) {
    currentPrice = data;
    console.log(currentPrice.bitcoin.usd);
}, function(error){
    console.log(error);
});
}

// Bitcoin historical price
function getHistoricalPrice() {$.ajax(`${HIST_PRICE_API_URL}${assetSelected}/history?date=${dateSelected}`).then(function(data) {
    historicalPrice = data
    console.log(historicalPrice.market_data.current_price.usd);
}, function(error){
    console.log(error);
});
}


// Call the handleGetData() function when user click
$form.on('submit', handleGetData);
// TODO: change the 'selected' variables to the input form
// TODO: Build a function that calculate = (currentPrice / historicalPrice)/historicalPrice
    // returnOverInvestment = ((current_price / historicalPrice) / historicalPrice)*100
    // console.log(returnOverInvestment);