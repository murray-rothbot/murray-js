[![npm version](https://img.shields.io/npm/v/murray-js.svg?style=flat-square)](https://www.npmjs.com/package/murray-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

# Murray JS

Murray JS is a comprehensive NPM package module designed for seamless integration with Murray Rothbot's suite of APIs, including Blockchain, Lightning, and Prices. This powerful library enables developers to quickly incorporate bitcoin data and interactions within their applications.

## Installation

To get started, install the package using either npm or yarn:

```bash
# npm
npm install murray-js

# yarn
yarn add murray-js
```

## Usage

After installation, import `murray-js` into your project to access the various APIs.

### Blockchain API

```js
import Murray from "murray-js";

const blockchainExample = async () => {
  const murray = new Murray();

  try {
    const fees = await murray.blockchain.getFeesRecommended();
    console.log(fees);

    const block = await murray.blockchain.getBlock({ height: 500000 });
    console.log(block);

    const blockTime = await murray.blockchain.getBlock2time({ height: 500000 });
    console.log(blockTime);

    const addressDetails = await murray.blockchain.getAddressDetails({
      address: "1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX",
    });
    console.log(addressDetails);
  } catch (error) {
    console.error(error);
  }
};

blockchainExample();
```

### Lightning API

```js
import Murray from "murray-js";

const lightningExample = async () => {
  const murray = new Murray();

  try {
    const nodeDetails = await murray.lightning.getNodeDetails({
      publicKey:
        "03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f",
    });
    console.log(nodeDetails);

    const statistics = await murray.lightning.getStatistics();
    console.log(statistics);

    const topNodes = await murray.lightning.getTopNodes();
    console.log(topNodes);
  } catch (error) {
    console.error(error);
  }
};

lightningExample();
```

### Prices API

```js
import Murray from "murray-js";

const pricesExample = async () => {
  const murray = new Murray();

  try {
    const ticker = await murray.prices.getTicker({ symbol: "BTCUSD" });
    console.log(ticker);

    const tickers = await murray.prices.getTickers({ symbol: "BTCUSD" });
    console.log(tickers);

    const currencyConversion = await murray.prices.convertCurrency({
      currency: "USD",
      value: 100,
    });
    console.log(currencyConversion);
  } catch (error) {
    console.error(error);
  }
};

pricesExample();
```

## Custom Endpoints

Customize endpoints for each API to suit your specific needs:

```js
import Murray from "murray-js";

const murray = new Murray({
  blockchainEndpoint: "https://your-custom-domain.com/",
  pricesEndpoint: "https://your-custom-domain.com/",
  lightningEndpoint: "https://your-custom-domain.com/",
});

const response = await murray.blockchain.getFees();
console.log(response);
```

## Examples

Find more examples in the repository to guide your implementation:

- [Blockchain](./examples/blockchain.ts)
- [Lightning](./examples/lightning.ts)
- [Prices](./examples/prices.ts)

## Self Hosted APIs

Leverage your self-hosted APIs for enhanced control and customization:

- [Service Blockchain](https://github.com/Murray-Rothbot/service-blockchain)
- [Service Lightning](https://github.com/Murray-Rothbot/service-lightning)
- [Service Prices](https://github.com/Murray-Rothbot/service-prices)

## Contributing

We welcome contributions! For significant changes or enhancements, please open an issue first to discuss your ideas.

## License

Murray JS is open-sourced software licensed under the [MIT license](./LICENSE).
