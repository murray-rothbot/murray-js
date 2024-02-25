// __tests__/getTopNodes.test.js
import axios from "axios";
import { getTopNodes } from "../index";
import { fakeTopNodesResponse } from "../__mocks__/lightningResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getTopNodes", () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  it("fetches successfully data from an API", async () => {
    mockedAxios.get.mockResolvedValue({ data: fakeTopNodesResponse });

    const response = await getTopNodes();

    expect(response).toEqual(fakeTopNodesResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://lightning.murrayrothbot.com/top`,
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getTopNodes()).rejects.toThrow(errorMessage);
  });

  it("handles unexpected response structure", async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    const response = await getTopNodes();

    expect(response).toEqual({});
  });
});
