import axios from "axios";
import { getNodeDetails } from "../index";
import { fakeLightningResponse } from "../__mocks__/lightningResponses";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("lightning.getNodeDetails", () => {
  it("fetches successfully data from an API for a node", async () => {
    const publicKey =
      "03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f";
    mockedAxios.get.mockResolvedValue({ data: fakeLightningResponse });

    const response = await getNodeDetails(publicKey);

    expect(response).toEqual(fakeLightningResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://lightning.murrayrothbot.com/node/${publicKey}`,
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Network Error";
    const publicKey =
      "03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getNodeDetails(publicKey)).rejects.toThrow(errorMessage);
  });

  it("handles unexpected response structure", async () => {
    const publicKey =
      "03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f";
    mockedAxios.get.mockResolvedValue({ data: {} });

    const response = await getNodeDetails(publicKey);

    expect(response).toEqual({});
  });
});
