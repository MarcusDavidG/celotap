const hre = require("hardhat");

async function main() {
  const network = hre.network.name;
  let cUSDAddress;
  
  // Set cUSD address based on network
  if (network === "sepolia") {
    // cUSD on Celo Sepolia Testnet (Official address from docs.celo.org)
    cUSDAddress = "0xEF4d55D6dE8e8d73232827Cd1e9b2F2dBb45bC80";
    console.log("Deploying to Celo Sepolia Testnet...");
  } else if (network === "alfajores") {
    // cUSD on Celo Alfajores Testnet
    cUSDAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
    console.log("Deploying to Celo Alfajores Testnet...");
  } else if (network === "mainnet") {
    // cUSD on Celo Mainnet
    cUSDAddress = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
    console.log("Deploying to Celo Mainnet...");
  } else {
    console.log("Deploying to local network...");
    cUSDAddress = "0xEF4d55D6dE8e8d73232827Cd1e9b2F2dBb45bC80";
  }

  console.log("Deploying CeloTapPayment contract...");
  console.log("Network:", network);
  console.log("cUSD Address:", cUSDAddress);

  const CeloTapPayment = await hre.ethers.getContractFactory("CeloTapPayment");
  const celoTapPayment = await CeloTapPayment.deploy(cUSDAddress);

  await celoTapPayment.deployed();

  console.log("\n✅ CeloTapPayment deployed to:", celoTapPayment.address);
  console.log("cUSD Address configured:", cUSDAddress);
  console.log("\nSave this contract address for your frontend configuration!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
