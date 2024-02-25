import axios from "axios";
import { getMempool } from "../index";
import { fakeMempoolResponse } from "../__mocks__/blockchainResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getMempool", () => {
  it("fetches successfully data from an API for mempool", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeMempoolResponse });

    const response = await getMempool();

    expect(response).toEqual(fakeMempoolResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://blockchain.murrayrothbot.com/mempool`,
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getMempool()).rejects.toThrow(errorMessage);
  });
});
