const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("health"); // We pass in "ninja" to the constructor when deploying
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);
  
  // let txn = await domainContract.register("doom");
  // await txn.wait();

  let txn = await domainContract.register("Dracula",  {value: hre.ethers.utils.parseEther('0.1')}); // We're passing in a second variable - value. This is the moneyyyyyyyyyy
  await txn.wait();

  // txn = await domainContract.register("hope"); // Remove 'let' becasue we dont want to re-declare ir or it will error
  // await txn.wait();

  // const domainAddress = await domainContract.getAddress("doom");
  // console.log("Owner of domain doom:", domainAddress);

  // domainAddress = await domainContract.getAddress("hope");
  // console.log("Owner of domain doom:", domainAddress);  // Same thing here w/ 'const' too

  // txn = await domainContract.setRecord("doom", "add address here!");
  // await txn.wait();
  // console.log("Set record for doom");

  // txn = await domainContract.setRecord("hope", "add address here!");
  // await txn.wait();
  // console.log("Set record for hope");

  // txn = await domainContract.connect(randomPerson).setRecord("doom", "Haha my domain now!");
  // await txn.wait();

  const address = await domainContract.getAddress("Dracula");
  console.log("Owner of domain Dracula:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  txn = await domainContract.setRecord("Dracula", "add address here!");
  await txn.wait();
  console.log("Set record for Dracula");
}


const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();