// Constants
const CURRENT_PRICE_API_URL = "https://api.coingecko.com/api/v3/simple/price";
const HIST_PRICE_API_URL = "https://api.coingecko.com/api/v3/coins/";

// jQuery selectors
const $form = $("form[name='submit']");
const $amountInput = $("#amount-data");
const $dateInput = $("#date-data");
const $roiDisplay = $("#roi");

async function getHistoricalPrice(asset, date) {
  const response = await fetch(
    `${HIST_PRICE_API_URL}${asset}/history?date=${date}`
  );
  const data = await response.json();
  return data;
}

async function getCurrentPrice(asset) {
  const response = await fetch(
    `${CURRENT_PRICE_API_URL}?ids=${asset}&vs_currencies=usd`
  );
  const data = await response.json();
  return data;
}

function returnOverInvestment(amountInvested, historicalPrice, currentPrice) {
  const amountBought = amountInvested / historicalPrice;
  const currentValue = amountBought * currentPrice;
  const roi = ((currentValue - amountInvested) / amountInvested) * 100;
  return roi.toFixed(2);
}

// Event listener when user click button
$form.on("submit", async function (event) {
  event.preventDefault();
  await handleGetData();
});

async function handleGetData() {
  // Grab value from form
  const amountSelected = $amountInput.val();
  let dateSelected = $dateInput.val();

  // Format date to API requirements dd-mm-yyyy
  dateSelected = dateSelected.split("-").reverse().join("-");

  // Fetch API data
  const historicalPriceData = await getHistoricalPrice("bitcoin", dateSelected);
  const currentPriceData = await getCurrentPrice("bitcoin");

  const historicalPrice = historicalPriceData.market_data.current_price.usd;
  const currentPrice = currentPriceData.bitcoin.usd;

  console.log(`The price of bitcoin in ${dateSelected} was`, historicalPrice);
  console.log("inside handleGetData ", currentPrice);

  // Calculate and log the return over investment
  const roi = returnOverInvestment(
    amountSelected,
    historicalPrice,
    currentPrice
  );
  console.log(`The return over investment is ${roi}%`);
  $roiDisplay.text(`The return over investment is ${roi}%`);
}
