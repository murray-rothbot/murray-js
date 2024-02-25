import axios from "axios";
import { postTransaction } from "../index";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("blockchain.postTransaction", () => {
  it("successfully sends a transaction and returns txId", async () => {
    const fakeResponse = { data: { txId: "1231231" } };
    mockedAxios.post.mockResolvedValue(fakeResponse);

    const txHex = "your-transaction-data-here";
    const response = await postTransaction(txHex);

    expect(response).toEqual(fakeResponse.data);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `http://blockchain.murrayrothbot.com/tx`,
      txHex,
      {
        headers: { accept: "application/json" },
      }
    );
  });

  it("handles API error gracefully when sending a transaction", async () => {
    const errorMessage = "Network Error";
    mockedAxios.post.mockRejectedValue(new Error(errorMessage));

    const transactionData = "invalid-transaction-data";
    await expect(postTransaction(transactionData)).rejects.toThrow(
      errorMessage
    );
  });
});
