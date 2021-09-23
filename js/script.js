// const and variables
const CURRENT_PRICE_API_URL = 'https://api.coingecko.com/api/v3/simple/price'
const HIST_PRICE_API_URL = 'https://api.coingecko.com/api/v3/coins/'

const $form = $('form');
const $input = $('input');

// Defining empty variables
let currentPrice;
let historicalPrice;

let assetSelected;
let amountSelected;
let dateSelected; //date format needs to be in 'dd-mm-yyyy' for the api in order to work

// Functions
// Event listener when user click button
async function handleGetData (event){
    event.preventDefault();
   
    // grab value from form and update variables.
    amountSelected = $("#amount-data").val();
    assetSelected = $("#asset-data").val();
    dateSelected = $("#date-data").val();
    
    // format date to api requirimements dd-mm-yyy
    dateSelected = dateSelected.split("-").reverse().join("-")

    // console.log updated variables.
    console.log("you selected " + amountSelected + " in USD");
    console.log("You selected the date of " + dateSelected);
    console.log("you chooosed " + assetSelected);

    // call the functions that fetch api data.
    let hp = await getHistoricalPrice();
    let cp = await getCurrentPrice();

    historicalPrice = hp.market_data.current_price.usd
    currentPrice = cp.bitcoin.usd
    
    console.log(`The price of ${assetSelected} in ${dateSelected} was`, historicalPrice);
    console.log('inside handleGetData ', currentPrice);

    // call the function that makes the roi.
    returnOverInvestment();
}

// asset current price function.
function getCurrentPrice() {
    return $.ajax(`${CURRENT_PRICE_API_URL}?ids=${assetSelected}&vs_currencies=usd`);
}

// asset historical price funtcion.
 function getHistoricalPrice() {
     return $.ajax(`${HIST_PRICE_API_URL}${assetSelected}/history?date=${dateSelected}`);
}

// Return over investment function.
function returnOverInvestment(){
    let roi = parseFloat(100 * (currentPrice - historicalPrice) / historicalPrice).toFixed(2); //ROI calculation with only two decimals
    let winLoss = Math.round(amountSelected*(1+(roi/100)));
    console.log(roi+"%");
    console.log(winLoss);
    console.log(`Your ${assetSelected} would be worth ${winLoss} USD now`);
    $("#text-results").append(`<p class="background">Your ${assetSelected } would be worth <strong>$${winLoss}USD</strong> now, thats <strong>${roi+"%"}</strong> over your $${amountSelected} initial investment </p> `);
};

// Call the handleGetData() function when user click
$form.on('submit', handleGetData);