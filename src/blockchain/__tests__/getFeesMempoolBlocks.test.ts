import axios from "axios";
import { getFeesMempoolBlocks } from "../index";
import { fakeMempoolBlocksResponse } from "../__mocks__/blockchainResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getFeesMempoolBlocks", () => {
  it("fetches successfully data from an API", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeMempoolBlocksResponse });

    const response = await getFeesMempoolBlocks();

    expect(response).toEqual(fakeMempoolBlocksResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://blockchain.murrayrothbot.com/fees/mempool-blocks",
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getFeesMempoolBlocks()).rejects.toThrow(errorMessage);
  });

  it("handles unexpected response structure", async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    const response = await getFeesMempoolBlocks();

    expect(response).toEqual({});
  });
});
