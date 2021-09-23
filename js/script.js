// const and variables
const CURRENT_PRICE_API_URL = 'https://api.coingecko.com/api/v3/simple/price'
const HIST_PRICE_API_URL = 'https://api.coingecko.com/api/v3/coins/'

let currentPrice = ''
let historicalPrice = ''

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
    returnOverInvestment();
}
// Bitcoin Current price
function getCurrentPrice() {$.ajax(`${CURRENT_PRICE_API_URL}?ids=${assetSelected}&vs_currencies=usd`).then(function(data) {
    currentPrice = data.bitcoin.usd;
    console.log(currentPrice);
}, function(error){
    console.log(error);
});
}

// Bitcoin historical price
function getHistoricalPrice() {$.ajax(`${HIST_PRICE_API_URL}${assetSelected}/history?date=${dateSelected}`).then(function(data) {
    historicalPrice = data.market_data.current_price.usd
    console.log(historicalPrice);
}, function(error){
    console.log(error);
});
}

// return over investment function.
// function returnOverInvestment(){
//     var roi = (currentPrice / historicalPrice) / historicalPrice * 100
// };
// console.log(roi);


// Call the handleGetData() function when user click
$form.on('submit', handleGetData);