# CeloTap

CeloTap is a mobile-first payment tool that makes stablecoin payments simple for everyday people and small merchants on the Celo blockchain.

## Features

- **Simple Payments**: Send and receive cUSD stablecoin payments
- **QR Code Support**: Generate and scan QR codes for quick payments
- **Merchant Mode**: Fast payment request system for merchants
- **Wallet Integration**: Connect with MetaMask or Valora
- **Mobile-Friendly**: Responsive design optimized for mobile devices
- **Phone Registration**: Map phone numbers to wallet addresses (future enhancement)

## Project Structure

```
celotap/
├── contracts/          # Solidity smart contracts
│   ├── contracts/      # Contract source files
│   ├── scripts/        # Deployment scripts
│   ├── test/          # Contract tests
│   └── hardhat.config.js
├── frontend/          # React web application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── context/     # React context (wallet)
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites

- Node.js v16 or higher
- MetaMask or Valora wallet
- Celo Alfajores testnet tokens ([Get from faucet](https://faucet.celo.org))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd celotap
```

2. **Install contract dependencies**
```bash
cd contracts
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

### Development

#### Smart Contracts

```bash
cd contracts

# Compile contracts
npm run compile

# Run tests
npm test

# Deploy to Alfajores testnet
npm run deploy:alfajores
```

#### Frontend

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build
```

## Smart Contract

The `CeloTapPayment.sol` contract provides:

- **Direct Payments**: Send cUSD to any address
- **Phone-Based Payments**: Register and pay using phone number hashes
- **Event Logging**: Track all payment transactions
- **ERC20 Support**: Built on standard token interface

## Technology Stack

- **Blockchain**: Celo (Alfajores Testnet)
- **Smart Contracts**: Solidity, Hardhat
- **Frontend**: React, Vite, TailwindCSS
- **Web3**: @celo/contractkit, ethers.js
- **QR Codes**: qrcode.react

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Testing

### Contract Tests

All contract functions are tested:
- ✅ cUSD address configuration
- ✅ Phone number registration
- ✅ Direct payments
- ✅ Phone-based payments
- ✅ Input validation
- ✅ Error handling

Run tests with:
```bash
cd contracts && npm test
```

## Security

- Contracts use OpenZeppelin libraries
- Input validation on all functions
- Event emission for transparency
- Non-custodial - users maintain control of funds

## Roadmap

See [TODO.md](./TODO.md) for the complete project roadmap.

**Completed:**
- ✅ Project setup
- ✅ Smart contract implementation
- ✅ Contract tests and deployment scripts
- ✅ Frontend wallet integration
- ✅ Payment UI (send/receive)
- ✅ QR code generation
- ✅ Merchant mode

**Upcoming:**
- 🔲 Backend for address book syncing
- 🔲 Local currency conversion API
- 🔲 Push notifications
- 🔲 Multi-language support
- 🔲 Additional stablecoin support

## Contributing

Contributions are welcome! Please read the development setup in this README and check TODO.md for areas that need work.

## License

MIT
