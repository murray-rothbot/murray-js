export interface setBaseURLParams {
  url: string;
}

export interface getBlockParams {
  hash?: string;
  height?: number;
}

export interface getBlock2timeParams {
  hash?: string;
  height?: number;
}

export interface getAddressDetailsParams {
  address: string;
}

export interface getAddressTransactionsParams {
  address: string;
}

export interface getAddressUTXOsParams {
  address: string;
}

export interface getTransactionParams {
  txid: string;
}

export interface postTransactionParams {
  txHex: string;
}
