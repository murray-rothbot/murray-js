import axios from "axios";
import { getFees } from "../index";
import { fakeFeesResponse } from "../__mocks__/blockchainResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getFees", () => {
  it("fetches successfully data from an API", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeFeesResponse });

    const response = await getFees();

    expect(response).toEqual(fakeFeesResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://blockchain.murrayrothbot.com/fees",
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getFees()).rejects.toThrow(errorMessage);
  });

  it("handles unexpected response structure", async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    const response = await getFees();

    expect(response).toEqual({});
  });
});
