export interface setBaseURLParams {
  url: string;
}

export interface convertCurrencyParams {
  currency: "BTC" | "BRL" | "SATS" | "USD";
  value: number;
}

export interface getTickerParams {
  symbol: "BTCUSD" | "BTCBRL" | "BTCUSDT";
}

export interface getTickersParams {
  symbol: "BTCUSD" | "BTCBRL" | "BTCUSDT";
}
