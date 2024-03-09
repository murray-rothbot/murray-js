[![npm version](https://img.shields.io/npm/v/murray-js.svg?style=flat-square)](https://www.npmjs.com/package/murray-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

# Murray JS

NPM package module for Murray Rothbot APIs.

---

## Installation

You can install the package using npm or yarn.

```bash
# npm
$ npm install murray-js

# yarn
$ yarn add murray-js
```

## How to use?

Example of how to use the package.

```js
import Murray from "murray-js";

const murray = new Murray();

// blockchain api example
const response = await murray.blockchain.getFees();
console.log(response);

// lightning api example
const response = await murray.lightning.getStatistics();
console.log(response);

// prices api example
const response = await murray.prices.getTickers({ symbol: "BTCUSD" });
console.log(response);
```

## Custom Endpoints

You can also use your custom endpoint for the blockchain, prices, and lightning.

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

- [Blockchain](./examples/blockchain.ts)
- [Lightning](./examples/lightning.ts)
- [Prices](./examples/prices.ts)

## Self Hosted APIs

You can also use your self-hosted APIs for the blockchain, lightning and prices.

- [Service Blockchain](https://github.com/Murray-Rothbot/service-blockchain)
- [Service Lightning](https://github.com/Murray-Rothbot/service-lightning)
- [Service Prices](https://github.com/Murray-Rothbot/service-prices)

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the terms of the [MIT](./LICENSE).
