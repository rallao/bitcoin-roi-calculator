// Constants
const CURRENT_PRICE_API_URL = "https://api.coingecko.com/api/v3/simple/price";
const HIST_PRICE_API_URL = "https://api.coingecko.com/api/v3/coins/";

// jQuery selectors
// jQuery selectors
const $form = $("#investment-form");
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

  // Calculate ROI and the amount of money won or lost
  const roi = returnOverInvestment(
    amountSelected,
    historicalPrice,
    currentPrice
  );
  const moneyWonOrLost = amountSelected * (roi / 100);

  // Create a message to display
  let message;
  if (moneyWonOrLost > 0) {
    message = `You have made a gain of $${moneyWonOrLost.toFixed(
      2
    )}, which represents a ${roi}% return on your investment.`;
  } else if (moneyWonOrLost < 0) {
    message = `You have made a loss of $${Math.abs(moneyWonOrLost).toFixed(
      2
    )}, which represents a ${roi}% return on your investment.`;
  } else {
    message = `You neither gained nor lost money on your investment.`;
  }

  // Add the affiliate link to the message
  message +=
    ' <a href="https://www.binance.com/es/activity/referral-entry/CPA?ref=CPA_005HC6NFN9" target="_blank">Click here to invest more!</a>';

  // Display the message
  $roiDisplay.html(message);
}
