import axios from "axios";
import { getHealth } from "../index";
import { fakeHealthResponse } from "../__mocks__/blockchainResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.getHealth", () => {
  it("fetches successfully data indicating API health status", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeHealthResponse });

    const response = await getHealth();

    expect(response).toEqual(fakeHealthResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://blockchain.murrayrothbot.com/health`,
      {
        headers: { accept: "*/*" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getHealth()).rejects.toThrow(errorMessage);
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getHealth()).rejects.toThrow(errorMessage);
  });
});
