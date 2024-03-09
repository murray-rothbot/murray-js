import Murray from "../src/index";

const PriceAPIEndpoints = async () => {
  const murray = new Murray();

  try {
    const response = await murray.prices.getTicker({ symbol: "BTCUSD" });
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await murray.prices.getTickers({ symbol: "BTCUSD" });
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await murray.prices.convertCurrency({
      currency: "USD",
      value: 100,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

PriceAPIEndpoints();
