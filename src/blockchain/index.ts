import axios from "axios";

const baseURL = "http://blockchain.murrayrothbot.com";

export const getBlock = async ({
  hash,
  height,
}: { hash?: string; height?: number } = {}) => {
  try {
    const response = await axios.get(`${baseURL}/block`, {
      params: { hash, height },
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch block: ${error}`);
  }
};

export const getBlock2time = async ({
  hash,
  height,
}: { hash?: string; height?: number } = {}) => {
  try {
    const response = await axios.get(`${baseURL}/block2time`, {
      params: { hash, height },
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch block time: ${error}`);
  }
};

export const getFees = async () => {
  try {
    const response = await axios.get(`${baseURL}/fees`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch fees: ${error}`);
  }
};

export const getAddressDetails = async (address: string) => {
  try {
    const response = await axios.get(`${baseURL}/address/${address}`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch address details: ${error}`);
  }
};

export const getAddressTransactions = async (address: string) => {
  try {
    const response = await axios.get(`${baseURL}/address/${address}/txs`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch transactions for address ${address}: ${error}`
    );
  }
};

export const getAddressUTXOs = async (address: string) => {
  try {
    const response = await axios.get(`${baseURL}/address/${address}/txs/utxo`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch UTXOs for address ${address}: ${error}`);
  }
};

export const getHashrate = async () => {
  try {
    const response = await axios.get(`${baseURL}/hashrate`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch hashrate: ${error}`);
  }
};

export const getHealth = async () => {
  try {
    const response = await axios.get(`${baseURL}/health`, {
      headers: { accept: "*/*" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to check API health: ${error}`);
  }
};

export const getMempool = async () => {
  try {
    const response = await axios.get(`${baseURL}/mempool`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch mempool data: ${error}`);
  }
};

export const getTransaction = async (txid: string) => {
  try {
    const response = await axios.get(`${baseURL}/tx/${txid}`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch transaction data for ${txid}: ${error}`);
  }
};

export const postTransaction = async (txHex: string) => {
  try {
    const response = await axios.post(`${baseURL}/tx`, txHex, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to send transaction: ${error}`);
  }
};

export default {
  getBlock,
  getBlock2time,
  getFees,
  getAddressDetails,
  getAddressTransactions,
  getAddressUTXOs,
  getHashrate,
  getHealth,
  getMempool,
  getTransaction,
  postTransaction,
};
