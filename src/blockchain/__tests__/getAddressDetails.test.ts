import axios from "axios";
import { getAddressDetails } from "../index";
import { fakeAddressDetailsResponse } from "../__mocks__/blockchainResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getAddressDetails", () => {
  it("fetches successfully data from an API for an address", async () => {
    const address = "bc1qkt5eval60henjz2q5razxklkxjumuf8vyd6usn";
    mockedAxios.get.mockResolvedValue({ data: fakeAddressDetailsResponse });

    const response = await getAddressDetails({ address });

    expect(response).toEqual(fakeAddressDetailsResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://blockchain.murrayrothbot.com/address/${address}`,
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    const address = "bc1qkt5eval60henjz2q5razxklkxjumuf8vyd6usn";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getAddressDetails({ address })).rejects.toThrow(errorMessage);
  });

  it("handles unexpected response structure", async () => {
    const address = "bc1qkt5eval60henjz2q5razxklkxjumuf8vyd6usn";
    mockedAxios.get.mockResolvedValue({ data: {} });

    const response = await getAddressDetails({ address });

    expect(response).toEqual({});
  });
});
