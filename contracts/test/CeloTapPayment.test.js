const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CeloTapPayment", function () {
  let celoTapPayment;
  let mockCUSD;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy mock cUSD token
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockCUSD = await MockERC20.deploy("Celo Dollar", "cUSD", 18);
    await mockCUSD.deployed();

    // Deploy CeloTapPayment contract
    const CeloTapPayment = await ethers.getContractFactory("CeloTapPayment");
    celoTapPayment = await CeloTapPayment.deploy(mockCUSD.address);
    await celoTapPayment.deployed();

    // Mint some cUSD to test accounts
    await mockCUSD.mint(owner.address, ethers.utils.parseEther("1000"));
    await mockCUSD.mint(addr1.address, ethers.utils.parseEther("1000"));
  });

  describe("Deployment", function () {
    it("Should set the correct cUSD address", async function () {
      expect(await celoTapPayment.cUSDAddress()).to.equal(mockCUSD.address);
    });
  });

  describe("Phone Registration", function () {
    it("Should register a phone number hash to an address", async function () {
      const phoneHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("+1234567890"));
      
      await celoTapPayment.connect(addr1).registerPhone(phoneHash);
      
      expect(await celoTapPayment.phoneToAddress(phoneHash)).to.equal(addr1.address);
    });

    it("Should not allow duplicate phone registration", async function () {
      const phoneHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("+1234567890"));
      
      await celoTapPayment.connect(addr1).registerPhone(phoneHash);
      
      await expect(
        celoTapPayment.connect(addr2).registerPhone(phoneHash)
      ).to.be.revertedWith("Phone already registered");
    });
  });

  describe("Payments", function () {
    it("Should make a payment to recipient", async function () {
      const amount = ethers.utils.parseEther("10");
      
      // Approve the contract to spend tokens
      await mockCUSD.connect(addr1).approve(celoTapPayment.address, amount);
      
      const initialBalance = await mockCUSD.balanceOf(addr2.address);
      
      await expect(
        celoTapPayment.connect(addr1).pay(addr2.address, amount, "Test payment")
      )
        .to.emit(celoTapPayment, "PaymentMade")
        .withArgs(addr1.address, addr2.address, amount, "Test payment");
      
      const finalBalance = await mockCUSD.balanceOf(addr2.address);
      expect(finalBalance.sub(initialBalance)).to.equal(amount);
    });

    it("Should reject payment with zero amount", async function () {
      await expect(
        celoTapPayment.connect(addr1).pay(addr2.address, 0, "Test")
      ).to.be.revertedWith("Amount must be > 0");
    });

    it("Should reject payment to zero address", async function () {
      const amount = ethers.utils.parseEther("10");
      
      await expect(
        celoTapPayment.connect(addr1).pay(ethers.constants.AddressZero, amount, "Test")
      ).to.be.revertedWith("Invalid recipient");
    });

    it("Should make payment by phone number hash", async function () {
      const phoneHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("+1234567890"));
      const amount = ethers.utils.parseEther("10");
      
      // Register phone
      await celoTapPayment.connect(addr2).registerPhone(phoneHash);
      
      // Approve and pay
      await mockCUSD.connect(addr1).approve(celoTapPayment.address, amount);
      
      await expect(
        celoTapPayment.connect(addr1).payByPhone(phoneHash, amount, "Payment via phone")
      )
        .to.emit(celoTapPayment, "PaymentMade")
        .withArgs(addr1.address, addr2.address, amount, "Payment via phone");
    });

    it("Should reject payment to unregistered phone", async function () {
      const phoneHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("+9999999999"));
      const amount = ethers.utils.parseEther("10");
      
      await mockCUSD.connect(addr1).approve(celoTapPayment.address, amount);
      
      await expect(
        celoTapPayment.connect(addr1).payByPhone(phoneHash, amount, "Test")
      ).to.be.revertedWith("Recipient not found");
    });
  });
});
