import axios from "axios";
import { getBlock2time } from "../index";
import { fakeBlock2TimeResponse } from "../__mocks__/blockchainResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getBlock2time", () => {
  it("fetches successfully data from an API", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeBlock2TimeResponse });

    const response = await getBlock2time({ hash: "somehash", height: 831908 });

    expect(response).toEqual(fakeBlock2TimeResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://blockchain.murrayrothbot.com/block2time",
      {
        params: { hash: "somehash", height: 831908 },
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getBlock2time({ hash: "somehash" })).rejects.toThrow(
      errorMessage
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://blockchain.murrayrothbot.com/block2time",
      {
        params: { hash: "somehash" },
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles unexpected response structure", async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    const response = await getBlock2time({ hash: "somehash" });

    expect(response).toEqual({});
  });

  it("fetches data without parameters", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeBlock2TimeResponse });

    const response = await getBlock2time();

    expect(response).toEqual(fakeBlock2TimeResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://blockchain.murrayrothbot.com/block2time",
      {
        params: {},
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles invalid parameters gracefully", async () => {
    const errorMessage = "Invalid parameters";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getBlock2time({ hash: "invalidhash" })).rejects.toThrow(
      errorMessage
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://blockchain.murrayrothbot.com/block2time",
      {
        params: { hash: "invalidhash" },
        headers: { accept: "application/json" },
      }
    );
  });
});
