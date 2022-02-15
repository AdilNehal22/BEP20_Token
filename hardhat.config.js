require("@nomiclabs/hardhat-waffle");
require('dotenv').config();


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  networks: {
    binance: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY]
    },
    fantomtest: {
      url: "https://rpc.testnet.fantom.network",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4002,
      live: false,
      saveDeployments: true,
      gasMultiplier: 2,
    },
    avalancheTest: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY]
    },
  }
};
