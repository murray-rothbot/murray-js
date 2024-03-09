import axios from "axios";
import {
  convertCurrencyParams,
  getTickerParams,
  getTickersParams,
  setBaseURLParams,
} from "./types";

let baseURL = "http://prices.murrayrothbot.com";

export const setBaseURL = ({ url }: setBaseURLParams) => {
  baseURL = url;
};

export const convertCurrency = async ({
  currency,
  value,
}: convertCurrencyParams) => {
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

export const getTicker = async ({ symbol }: getTickerParams) => {
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

export const getTickers = async ({ symbol }: getTickersParams) => {
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
  setBaseURL,
  convertCurrency,
  getTicker,
  getTickers,
};
