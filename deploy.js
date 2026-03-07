const hre = require("hardhat");

async function main() {
  console.log("Deploying RecruiterRegistry to Polygon...");

  const RecruiterRegistry = await hre.ethers.getContractFactory("RecruiterRegistry");
  const registry = await RecruiterRegistry.deploy();

  await registry.waitForDeployment();

  console.log(
    `RecruiterRegistry deployed to ${await registry.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
