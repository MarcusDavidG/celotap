# CeloTap dApp Project TODO

## Project Overview
CeloTap is a mobile-first payment tool built on Celo blockchain enabling simple, fast, and affordable stablecoin payments (cUSD) for everyday users and small merchants. It offers QR code payments, payment links, phone-based identifiers, an address book, and local currency display.

---

## Project Tasks

### 1. Project Initialization
- Create main project directory with subfolders:
  - `contracts/`: Smart contract source code and deployments
  - `frontend/`: React web app using shadcn UI components
- Initialize git repo and .gitignore

### 2. Smart Contract Development in `contracts/`
- Setup Solidity environment (e.g., Hardhat or Truffle)
- Create `CeloTapPayment.sol` contract:
  - Support stablecoin payments (cUSD)
  - Handle QR code payment logic (payment requests, payment completion)
  - Map phone number or username to address
  - Event logging for payments
- Add contract deployment scripts
- Write tests for contract functionalities

### 3. Frontend Setup in `frontend/`
- Create React app with shadcn UI components setup
- Setup Celo dApp tools (e.g., @celo/contractkit, wallet connection)
- Configure environment variables for Celo networks

### 4. Frontend - User Authentication & Wallet Integration
- Wallet connect integration for Celo wallets (Valora, MetaMask with Celo)
- User profile setup for phone-based or username-based identifiers

### 5. Frontend - Payments UI
- QR Code generation and scanning for tap-to-pay
- Payment links creation and processing
- Payment sending & receiving screens
- Merchant mode dashboard:
  - Payment tracking
  - Quick "Request Payment" button
- Local currency conversion display

### 6. Backend (Optional)
- Lightweight backend for address book syncing if needed
- API for exchange rates (to show local currency)

### 7. Testing & Quality Assurance
- Unit testing for contracts
- End-to-end testing for frontend workflows
- Performance testing on low bandwidth / mobile devices

### 8. Deployment
- Deploy contracts to Celo Alfajores / Mainnet
- Deploy frontend app on a web hosting or IPFS
- Configure domain and HTTPS

### 9. Documentation
- User guide for merchants and users
- Developer setup and contribution guide

### 10. Future Enhancements (Optional)
- Push notification integrations
- Multi-language support
- Additional stablecoin support

---

## Follow Up Steps
- Implement each task methodically starting from Project Initialization
- Continually test and validate functionalities after each implementation phase

---

**Note:** This TODO.md is for internal tracking and will not be committed or pushed to GitHub.
