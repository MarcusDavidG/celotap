# CeloTap Deployment Guide

## Prerequisites

- Node.js v16 or higher
- MetaMask or Valora wallet with Celo Alfajores testnet configured
- Alfajores testnet CELO and cUSD tokens (get from [Celo Faucet](https://faucet.celo.org))

## Smart Contract Deployment

### 1. Install Dependencies

```bash
cd contracts
npm install
```

### 2. Configure Environment

Create a `.env` file in the `contracts` directory:

```env
PRIVATE_KEY=your_wallet_private_key_here
```

### 3. Compile Contracts

```bash
npm run compile
```

### 4. Run Tests

```bash
npm test
```

### 5. Deploy to Alfajores

```bash
npm run deploy:alfajores
```

Save the deployed contract address for frontend configuration.

## Frontend Deployment

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create a `.env` file in the `frontend` directory:

```env
VITE_CELO_NETWORK=alfajores
VITE_CELO_RPC_URL=https://alfajores-forno.celo-testnet.org
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_CUSD_ADDRESS=0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1
```

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Build

```bash
npm run preview
```

### 5. Deploy to Hosting

The `dist` folder contains the production build. You can deploy it to:

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **IPFS**: Use `ipfs-deploy` or Fleek

## Network Configuration

### Celo Alfajores Testnet

- Chain ID: 44787 (0xaef3)
- RPC URL: https://alfajores-forno.celo-testnet.org
- Block Explorer: https://alfajores.celoscan.io
- cUSD Address: 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1

### Celo Mainnet

- Chain ID: 42220 (0xa4ec)
- RPC URL: https://forno.celo.org
- Block Explorer: https://celoscan.io
- cUSD Address: 0x765DE816845861e75A25fCA122bb6898B8B1282a

## Post-Deployment Checklist

- [ ] Contract deployed and verified on block explorer
- [ ] Frontend environment variables configured
- [ ] Wallet connection tested
- [ ] Payment sending tested
- [ ] Payment receiving tested
- [ ] QR code generation working
- [ ] Merchant mode functional

## Troubleshooting

### Wallet Connection Issues

- Ensure MetaMask is installed and configured for Celo network
- Check that you're on the correct network (Alfajores testnet)
- Clear browser cache and reload

### Transaction Failures

- Ensure sufficient CELO for gas fees
- Check cUSD balance before sending payments
- Verify contract address is correct in .env

### Build Errors

- Delete `node_modules` and run `npm install` again
- Ensure Node.js version is 16 or higher
- Check for dependency conflicts

## Support

For issues or questions:
- Check [Celo Documentation](https://docs.celo.org)
- Visit [Celo Discord](https://discord.gg/celo)
- Review project TODO.md for known limitations
