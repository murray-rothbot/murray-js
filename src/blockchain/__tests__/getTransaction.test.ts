import axios from "axios";
import { getTransaction } from "../index";
import { fakeTransactionResponse } from "../__mocks__/blockchainResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getTransaction", () => {
  it("fetches successfully data from an API for a specific transaction", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeTransactionResponse });

    const txid =
      "16a354b9bc57cd4387ec00d3a7897110d4b319a85a754258369956179a012eda";
    const response = await getTransaction(txid);

    expect(response).toEqual(fakeTransactionResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://blockchain.murrayrothbot.com/tx/${txid}`,
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    const txid = "someinvalidtxid";
    await expect(getTransaction(txid)).rejects.toThrow(errorMessage);
  });
});
