import blockchain, {
  setBaseURL as setBlockchainBaseURL,
} from "./blockchain/index";
import lightning, {
  setBaseURL as setLightningBaseURL,
} from "./lightning/index";
import prices, { setBaseURL as setPricesBaseURL } from "./prices/index";

interface MurrayParams {
  blockchainEndpoint?: string;
  pricesEndpoint?: string;
  lightningEndpoint?: string;
}

// default endpoints
const blockchainAPIEndpoint = "http://blockchain.murrayrothbot.com";
const pricesAPIEndpoint = "http://prices.murrayrothbot.com";
const lightningAPIEndpoint = "http://lightning.murrayrothbot.com";

class Murray {
  constructor({
    blockchainEndpoint = blockchainAPIEndpoint,
    pricesEndpoint = pricesAPIEndpoint,
    lightningEndpoint = lightningAPIEndpoint,
  }: MurrayParams = {}) {
    setBlockchainBaseURL({ url: blockchainEndpoint });
    setPricesBaseURL({ url: pricesEndpoint });
    setLightningBaseURL({ url: lightningEndpoint });
  }

  get blockchain() {
    return blockchain;
  }

  get lightning() {
    return lightning;
  }

  get prices() {
    return prices;
  }
}

export default Murray;
