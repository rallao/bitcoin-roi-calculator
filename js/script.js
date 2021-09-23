// const and variables
const CURRENT_PRICE_API_URL = 'https://api.coingecko.com/api/v3/simple/price'
const HIST_PRICE_API_URL = 'https://api.coingecko.com/api/v3/coins/'

let currentPrice;
let historicalPrice;

const $form = $('form');
const $input = $('input');

// Defining empty variables
let assetSelected;
let amountSelected;
let dateSelected; //date format needs to be in 'dd-mm-yyyy' for the api in order to work

// Functions
// Event listener when user click button
function handleGetData (event){
    event.preventDefault();
    // grab value from form and update variables.
    amountSelected = $("#amount-data").val();
    assetSelected = $("#asset-data").val();
    dateSelected = $("#date-data").val();
    // format date to api requirimements dd-mm-yyy
    dateSelected = dateSelected.split("-").reverse().join("-")

    // console.log updated variables.
    console.log(amountSelected);
    console.log(dateSelected);
    console.log(assetSelected);

    // call the functions that fetch api data.
    getHistoricalPrice();
    getCurrentPrice();

    // call the function that makes the roi.
    returnOverInvestment();
}
// asset current price function.
function getCurrentPrice() {$.ajax(`${CURRENT_PRICE_API_URL}?ids=${assetSelected}&vs_currencies=usd`).then(function(data) {
    currentPrice = data.assetSelected.usd;
    console.log(`The current price of ${assetSelected} is ${currentPrice}`);
}, function(error){
    console.log(error);
});
}

// asset historical price funtcion.
function getHistoricalPrice() {$.ajax(`${HIST_PRICE_API_URL}${assetSelected}/history?date=${dateSelected}`).then(function(data) {
    historicalPrice = data.market_data.current_price.usd
    console.log(`The price of ${assetSelected} in ${dateSelected} was ${historicalPrice}`);
}, function(error){
    console.log(error);
});
}

// Return over investment function.
function returnOverInvestment(){
    let roi = parseInt(100 * (currentPrice - historicalPrice) / historicalPrice);
    console.log(roi);
};


// Call the handleGetData() function when user click
$form.on('submit', handleGetData);