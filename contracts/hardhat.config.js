require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      // accounts: [privateKey] // to be set in environment variables
    },
    mainnet: {
      url: "https://forno.celo.org",
      // accounts: [privateKey]
    },
  },
};
