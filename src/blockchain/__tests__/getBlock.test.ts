import axios from "axios";
import { getBlock } from "../index";
import { fakeBlockResponse } from "../__mocks__/blockchainResponses";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getBlock", () => {
  it("fetches successfully data from an API", async () => {
    mockedAxios.get.mockResolvedValue(fakeBlockResponse);

    const response = await getBlock({ hash: "somehash", height: 831908 });

    expect(response).toEqual(fakeBlockResponse.data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://blockchain.murrayrothbot.com/block",
      {
        params: { hash: "somehash", height: 831908 },
        headers: { accept: "application/json" },
      }
    );
  });

  it("fetches data without parameters", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeBlockResponse.data });

    const response = await getBlock();

    expect(response).toEqual(fakeBlockResponse.data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://blockchain.murrayrothbot.com/block",
      { params: {}, headers: { accept: "application/json" } }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(
      getBlock({ hash: "somehash", height: 831908 })
    ).rejects.toThrow(errorMessage);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://blockchain.murrayrothbot.com/block",
      {
        params: { hash: "somehash", height: 831908 },
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles invalid parameters gracefully", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Invalid parameters"));

    await expect(getBlock({ hash: "invalidhash" })).rejects.toThrow(
      "Invalid parameters"
    );
  });
});
