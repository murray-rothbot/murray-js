import axios from "axios";
import { getNodeDetailsParams, setBaseURLParams } from "./types";

let baseURL = "http://lightning.murrayrothbot.com";

export const setBaseURL = ({ url }: setBaseURLParams) => {
  baseURL = url;
};

export const getNodeDetails = async ({ publicKey }: getNodeDetailsParams) => {
  try {
    const response = await axios.get(`${baseURL}/node/${publicKey}`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch node details: ${error}`);
  }
};

export const getStatistics = async () => {
  try {
    const response = await axios.get(`${baseURL}/statistics`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch Lightning network statistics: ${error}`);
  }
};

export const getTopNodes = async () => {
  try {
    const response = await axios.get(`${baseURL}/top`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch top Lightning network nodes: ${error}`);
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

export default {
  setBaseURL,
  getStatistics,
  getTopNodes,
  getNodeDetails,
  getHealth,
};
