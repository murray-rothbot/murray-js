import axios from "axios";
import { getHashrate } from "../index";
import { fakeHashrateResponse } from "../__mocks__/blockchainResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getHashrate", () => {
  it("fetches successfully data from an API for hashrate", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeHashrateResponse });

    const response = await getHashrate();

    expect(response).toEqual(fakeHashrateResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://blockchain.murrayrothbot.com/hashrate`,
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getHashrate()).rejects.toThrow(errorMessage);
  });

  it("handles unexpected response structure", async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    const response = await getHashrate();

    expect(response).toEqual({});
  });
});
