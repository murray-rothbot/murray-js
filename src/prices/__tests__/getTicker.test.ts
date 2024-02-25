import axios from "axios";
import { getTicker } from "../index";
import { fakeTickerResponse } from "../__mocks__/pricesResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("prices.getTicker", () => {
  it("fetches successfully data from an API for ticker information", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeTickerResponse });

    const symbol = "BTCUSD";
    const response = await getTicker(symbol);

    expect(response).toEqual(fakeTickerResponse.data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://prices.murrayrothbot.com/ticker`,
      {
        params: { symbol },
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getTicker("BTCUSD")).rejects.toThrow(errorMessage);
  });
});
