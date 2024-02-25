// __tests__/getStatistics.test.js
import axios from "axios";
import { getStatistics } from "../index";
import { fakeStatisticsResponse } from "../__mocks__/lightningResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getStatistics", () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  it("fetches successfully data from an API", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeStatisticsResponse });

    const response = await getStatistics();

    expect(response).toEqual(fakeStatisticsResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://lightning.murrayrothbot.com/statistics`,
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getStatistics()).rejects.toThrow(errorMessage);
  });

  it("handles unexpected response structure", async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    const response = await getStatistics();

    expect(response).toEqual({});
  });
});
