import Murray from "../src/index";

const BlockchainAPIEndpoints = async () => {
  const murray = new Murray();

  try {
    const response = await murray.blockchain.getFeesRecommended();
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await murray.blockchain.getBlock({ height: 500000 });
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await murray.blockchain.getBlock2time({ height: 500000 });
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await murray.blockchain.getAddressDetails({
      address: "1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX",
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

BlockchainAPIEndpoints();
