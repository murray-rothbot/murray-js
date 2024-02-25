import axios from "axios";
import { getAddressUTXOs } from "../index";
import { fakeAddressUTXOResponse } from "../__mocks__/blockchainResponses";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getAddressUTXOs", () => {
  it("fetches successfully data from an API for an address UTXOs", async () => {
    const address = "bc1qkt5eval60henjz2q5razxklkxjumuf8vyd6usn";
    mockedAxios.get.mockResolvedValue({ data: fakeAddressUTXOResponse });

    const response = await getAddressUTXOs(address);

    expect(response).toEqual(fakeAddressUTXOResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://blockchain.murrayrothbot.com/address/${address}/txs/utxo`,
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    const address = "bc1qkt5eval60henjz2q5razxklkxjumuf8vyd6usn";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getAddressUTXOs(address)).rejects.toThrow(errorMessage);
  });

  it("handles unexpected response structure", async () => {
    const address = "bc1qkt5eval60henjz2q5razxklkxjumuf8vyd6usn";
    mockedAxios.get.mockResolvedValue({ data: {} }); // Simula uma resposta inesperada

    const response = await getAddressUTXOs(address);

    // Verifique o comportamento esperado aqui
    expect(response).toEqual({});
  });
});
