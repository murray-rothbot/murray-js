import axios from "axios";

const baseURL = "http://prices.murrayrothbot.com";

export const convertCurrency = async (currency: string, value: number) => {
  try {
    const response = await axios.get(`${baseURL}/convert`, {
      params: { currency, value },
      headers: { accept: "application/json" },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to convert currency: ${error}`);
  }
};

export const getTicker = async (symbol: string) => {
  try {
    const response = await axios.get(`${baseURL}/ticker`, {
      params: { symbol },
      headers: { accept: "application/json" },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch ticker information: ${error}`);
  }
};

export const getTickers = async (symbol: string) => {
  try {
    const response = await axios.get(
      `http://prices.murrayrothbot.com/tickers`,
      {
        params: { symbol },
        headers: { accept: "application/json" },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch tickers information: ${error}`);
  }
};

export default {
  convertCurrency,
  getTicker,
  getTickers,
};
