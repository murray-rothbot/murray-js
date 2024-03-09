import Murray from "../src/index";

const LightningAPIEndpoints = async () => {
  const murray = new Murray();

  try {
    const response = await murray.lightning.getNodeDetails({
      publicKey:
        "03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f",
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await murray.lightning.getStatistics();
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await murray.lightning.getTopNodes();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

LightningAPIEndpoints();
