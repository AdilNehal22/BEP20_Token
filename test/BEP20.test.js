const { expect } = require("chai");
const { ethers } = require("hardhat");


let BEP20;
let bep20;
let receiver;
let spender;
let receiver2;
let spenderAllowedValue;

describe("BEP20", async function () {

  it("Should deploy token correctly", async function () {
    BEP20 = await ethers.getContractFactory("BEP20");
    bep20 = await BEP20.deploy();
    await bep20.deployed();
    console.log(`deploys the contract ${bep20.address}`);
  });

  it("transfer the total supply to the owner", async () => {
    const tokenOwner = await bep20.tokenOwner();
    const balanceOwner = await bep20.balanceOf(tokenOwner);
    expect(balanceOwner).is.equal(100000);
  });

  it("should transfer the tokens to the receiver", async () => {
    [_, receiver] = await ethers.getSigners();
    await bep20.transferToken(receiver.address, '1000');
    const balanceReceiverAfterTransfer = await bep20.balanceOf(receiver.address);
    expect(balanceReceiverAfterTransfer).is.equal(1000);
  });

  it("approves the spender to spend tokens on behalf of owner", async () => {
    [_, spender, receiver2] = await ethers.getSigners();
    await bep20.approve(spender.address, '500');
    const tokenOwner = await bep20.getOwner();
    spenderAllowedValue = await bep20.allowance(tokenOwner, spender.address);
    expect(spenderAllowedValue).is.equal(500);
  });

  it("transfer tokens to the spender after approve for allowance", async () => {
    [_, receiver2] = await ethers.getSigners();
    await bep20.approve(spender.address, '500');
    const tokenOwner = await bep20.getOwner();
    await bep20.connect(spender).transferFrom(
      tokenOwner,
      receiver2.address,
      '500');
    const receiver2Bal = await bep20.balanceOf(receiver2.address);
    expect(receiver2Bal).is.equal(1500);
  });

});
