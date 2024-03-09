import axios from "axios";
import { convertCurrency } from "../index";
import { fakeConvertCurrencyResponse } from "../__mocks__/pricesResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("prices.convertCurrency", () => {
  it("fetches successfully data from an API for currency conversion", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeConvertCurrencyResponse });

    const currency = "BTC";
    const value = 1;
    const response = await convertCurrency({ currency, value });

    expect(response).toEqual(fakeConvertCurrencyResponse.data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://prices.murrayrothbot.com/convert`,
      {
        params: { currency, value },
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(
      convertCurrency({ currency: "BTC", value: 1 })
    ).rejects.toThrow(errorMessage);
  });
});
