import axios from "axios";
import { getTickers } from "../index";
import { fakeTickersResponse } from "../__mocks__/pricesResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("prices.getTickers", () => {
  it("fetches successfully data from an API for multiple tickers", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeTickersResponse });

    const symbol = "BTCUSD";
    const response = await getTickers({ symbol });

    expect(response).toEqual(fakeTickersResponse.data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://prices.murrayrothbot.com/tickers`,
      {
        params: { symbol },
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getTickers({ symbol: "BTCUSD" })).rejects.toThrow(
      errorMessage
    );
  });
});
