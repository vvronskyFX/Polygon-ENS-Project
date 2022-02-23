require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.10",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/WReJAeISWEEWIakb3V1Mfflus4APhEf1",
      accounts: ["148c3ffa40e8d49a67ff9251e2237d0ea5f4f01f03e1599299d5d9d9f5edf73d"],
    }
  }
};
