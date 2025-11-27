# CeloTap 💸

<div align="center">

![CeloTap](https://img.shields.io/badge/CeloTap-Live-brightgreen?style=for-the-badge)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://celotap.vercel.app)
[![Celo](https://img.shields.io/badge/Celo-Sepolia-FBCC5C?style=for-the-badge&logo=celo)](https://celo-sepolia.blockscout.com/)

**A beautiful, mobile-first Web3 payment dApp built on Celo blockchain**

[Live Demo](https://celotap.vercel.app) · [Report Bug](https://github.com/MarcusDavidG/celotap/issues) · [Request Feature](https://github.com/MarcusDavidG/celotap/issues)

</div>

---

## 🌟 Overview

CeloTap makes cryptocurrency payments as simple as scanning a QR code. Built for everyday people and small merchants, it offers instant, low-cost payments using Celo stablecoins with a stunning, modern UI that doesn't feel like a blockchain app.

### ✨ Key Features

- **💳 Multi-Token Support** - Send/receive CELO and cUSD with one-tap token switching
- **📱 QR Code Payments** - Generate and scan QR codes for instant payments
- **🏪 Merchant Mode** - Quick payment requests with preset amounts
- **💰 Live USD Prices** - Real-time price conversion for all crypto amounts
- **📊 Transaction History** - Track all your payments with beautiful UI
- **🎨 Modern UI/UX** - Glassmorphism design with smooth animations
- **📲 Mobile-First** - Optimized responsive design for all devices
- **🔐 Non-Custodial** - You control your funds, always

### 🚀 Live Application

**Production URL:** [https://celotap.vercel.app](https://celotap.vercel.app)

**Smart Contract:** `0xba5f7756a16ce91123B22CE18B434C9d839b5438` ([View on Explorer](https://celo-sepolia.blockscout.com/address/0xba5f7756a16ce91123B22CE18B434C9d839b5438))

**Network:** Celo Sepolia Testnet (Chain ID: 11142220)

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

## 🛠️ Technology Stack

### Blockchain Layer
- **Network**: Celo Sepolia Testnet
- **Smart Contracts**: Solidity 0.8.19
- **Development**: Hardhat, OpenZeppelin Contracts
- **Testing**: Chai, Hardhat Testing Framework

### Frontend Layer
- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS 3.x with custom Celo theme
- **Web3**: @celo/contractkit v10.0.2, ethers.js v5
- **UI Components**: React Icons, QRCode.react
- **State Management**: React Context API
- **Routing**: React Router v6

### APIs & Services
- **Price Data**: CoinGecko API (live crypto prices)
- **Transaction Data**: Blockscout API (Celo Sepolia)
- **Hosting**: Vercel (serverless deployment)

### Developer Tools
- **Version Control**: Git/GitHub
- **CI/CD**: Vercel Auto-Deploy
- **Package Manager**: npm

## 🚀 Deployment

### Production Environment

- **Platform**: Vercel
- **URL**: https://celotap.vercel.app
- **Auto-Deploy**: Enabled from `main` branch
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Environment Variables

Required environment variables for deployment:

```bash
VITE_CONTRACT_ADDRESS=0xba5f7756a16ce91123B22CE18B434C9d839b5438
VITE_CUSD_ADDRESS=0xEF4d55D6dE8e8d73232827Cd1e9b2F2dBb45bC80
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MarcusDavidG/celotap)

1. Click the button above
2. Set environment variables
3. Deploy!

## 📸 Screenshots

### Dashboard
*Beautiful glassmorphism UI showing balances with live USD conversion*

### Send Payment
*Simple token selector with real-time price updates*

### Transaction History
*Track all your payments with elegant design*

### Merchant Mode
*Quick payment requests for businesses*

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

## 🗺️ Roadmap

### ✅ Completed (v1.0)
- Smart contract deployment to Celo Sepolia
- Comprehensive test suite (8/8 passing)
- Modern glassmorphism UI with Celo branding
- Wallet integration (MetaMask/Valora)
- CELO and cUSD payment support
- QR code generation for payments
- Merchant mode with preset amounts
- Live USD price conversion (CoinGecko API)
- Transaction history (Blockscout integration)
- Production deployment on Vercel

### 🚧 In Progress (v1.1)
- Light/Dark mode theme toggle
- Enhanced landing page
- Modern wallet connect (RainbowKit)
- QR code scanner (scan-to-pay)
- Payment notifications
- Address book for frequent recipients

### 📋 Planned (v2.0)
- Multi-language support (i18n)
- Additional stablecoin support (USDC, USDT)
- Mainnet deployment
- Mobile app (React Native)
- Payment request links
- Recurring payments
- Payment splitting
- Analytics dashboard

See [TODO.md](./TODO.md) for detailed project tracking.

## Contributing

Contributions are welcome! Please read the development setup in this README and check TODO.md for areas that need work.

## License

MIT
