import axios from "axios";
import { getAddressTransactions } from "../index";
import { fakeAddressTransactionsResponse } from "../__mocks__/blockchainResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getAddressTransactions", () => {
  it("fetches successfully data from an API for an address transactions", async () => {
    const address = "bc1qkt5eval60henjz2q5razxklkxjumuf8vyd6usn";
    mockedAxios.get.mockResolvedValue({
      data: fakeAddressTransactionsResponse,
    });

    const response = await getAddressTransactions({ address });

    expect(response).toEqual(fakeAddressTransactionsResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://blockchain.murrayrothbot.com/address/${address}/txs`,
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    const address = "bc1qkt5eval60henjz2q5razxklkxjumuf8vyd6usn";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getAddressTransactions({ address })).rejects.toThrow(
      errorMessage
    );
  });

  it("handles unexpected response structure", async () => {
    const address = "bc1qkt5eval60henjz2q5razxklkxjumuf8vyd6usn";
    mockedAxios.get.mockResolvedValue({ data: {} });

    const response = await getAddressTransactions({ address });

    expect(response).toEqual({});
  });
});
