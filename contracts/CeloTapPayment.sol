// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title CeloTap Payment Contract
/// @notice Handles stablecoin payments and mappings for the CeloTap dApp
contract CeloTapPayment {
    // cUSD token contract address on Celo Alfajores testnet
    address public cUSDAddress;

    // Mapping from phone number hash to wallet address
    mapping(bytes32 => address) public phoneToAddress;

    // Event emitted for a payment
    event PaymentMade(address indexed from, address indexed to, uint256 amount, string reference);

    constructor(address _cUSDAddress) {
        cUSDAddress = _cUSDAddress;
    }

    /// @notice Register phone number to an address
    function registerPhone(bytes32 phoneHash) external {
        require(phoneToAddress[phoneHash] == address(0), "Phone already registered");
        phoneToAddress[phoneHash] = msg.sender;
    }

    /// @notice Make payment to a recipient address with reference
    function pay(address recipient, uint256 amount, string calldata reference) external {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be > 0");

        IERC20 cUSD = IERC20(cUSDAddress);

        require(cUSD.transferFrom(msg.sender, recipient, amount), "Payment failed");

        emit PaymentMade(msg.sender, recipient, amount, reference);
    }

    /// @notice Make payment by phone number hash
    function payByPhone(bytes32 phoneHash, uint256 amount, string calldata reference) external {
        address recipient = phoneToAddress[phoneHash];
        require(recipient != address(0), "Recipient not found");

        pay(recipient, amount, reference);
    }
}
