const hre = require("hardhat");

async function main() {
  // cUSD token address on Celo Alfajores testnet
  const cUSDAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

  console.log("Deploying CeloTapPayment contract...");

  const CeloTapPayment = await hre.ethers.getContractFactory("CeloTapPayment");
  const celoTapPayment = await CeloTapPayment.deploy(cUSDAddress);

  await celoTapPayment.deployed();

  console.log("CeloTapPayment deployed to:", celoTapPayment.address);
  console.log("cUSD Address configured:", cUSDAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
