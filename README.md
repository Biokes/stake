## Staketh

[Live demo](https://staketh.vercel.app)

Staketh is a frontend staking dApp built with React, TypeScript and Vite that integrates with an on-chain ERC20 token and a staking smart contract. It uses modern Ethereum tooling (viem, ethers, wagmi, RainbowKit) to provide wallet connection, contract reads/writes, and live event updates. The project is currently configured to run on the Sepolia testnet.

## Key features

- Connect wallet using RainbowKit/wagmi
- Read protocol stats (total staked, reward rate)
- View user staking state (staked amount, pending rewards, unlock time)
- Approve token allowance and stake tokens
- Claim rewards and perform emergency withdrawal
- Real-time event watches to update UI after on-chain events

## Tech stack

- React + TypeScript
- Vite (development & build)
- wagmi + RainbowKit (wallet connection)
- viem & ethers (RPC + contract interactions)
- Tailwind CSS for styling
- React Query for async data (present in deps)

## Repo layout (important files)

- `src/` — application source
	- `components/` — UI components, pages, and shared layout
	- `config/` — RPC and wallet configuration (`src/config/index.ts`)
	- `constants/` — on-chain addresses & ABIs (`src/constants/index.ts`)
	- `contexts/` — React contexts and the `StakingProvider`
	- `hooks/` — reusable hooks
	- `layout/` — app layout and routing
	- `lib/` — shared types and utilities
- `package.json` — scripts and dependencies
- `vite.config.ts` — Vite configuration

Review these files when changing network settings or contract addresses:

- `src/constants/index.ts` — token and staking contract addresses and ABIs (update these to point at your contracts)
- `src/config/constants.ts` — `APP_NAME` and `PROJECT_ID` used by RainbowKit/wallet config

## Quick start

Prerequisites

- Node.js 18+ (or the LTS available for your environment)
- pnpm (recommended because this repo includes a `pnpm-lock.yaml`) or npm/yarn

Install

```bash
# using pnpm (recommended)
pnpm install

# or using npm
npm install
```

Run development server

```bash
pnpm run dev
# then open http://localhost:5173 (Vite's default) in your browser
```

Build for production

```bash
pnpm run build
pnpm run preview   # preview the production build locally
```

Linting

```bash
pnpm run lint
```

## Configuration

There are a couple of places you may want to update before running the app in a different environment or with your own contracts:

- `src/constants/index.ts`
	- `TOKEN_ADDRESS` — ERC20 token contract address
	- `STAKING_CONTRACT_ADDRESS` — staking contract address
	- `TOKEN_ABI` and `STAKING_CONTRACT_ABI` — ABIs used by the app

- `src/config/constants.ts`
	- `APP_NAME` — the visible app name used by RainbowKit
	- `PROJECT_ID` — (currently set) WalletConnect project id used by the wallet/connect UI

If you want to move these values to environment variables, you can refactor `src/config/constants.ts` to read from `process.env` and add a `.env` file (Vite supports `import.meta.env`). For now the app reads the constants directly from the file.

## How it works (high level)

- Wallet connect: RainbowKit (via wagmi) handles connecting wallets. The client config is created in `src/config/index.ts`.
- On-chain reads: `publicClient.readContract` (from viem/wagmi) is used in `StakingProvider` to fetch the user's details and protocol stats.
- Writes: `writeContractAsync` (wagmi) is used for `approve`, `stake`, `claimRewards`, and `emergencyWithdraw` flows.
- Event updates: The app watches contract events and updates the UI when `Staked` and similar events are emitted.

## User flows

- Approve & Stake
	1. Connect wallet
	2. Click approve — this sends an ERC20 `approve` transaction to allow the staking contract to spend tokens
	3. After approval finalizes, call `stake` to send the `stake` transaction

- Claim Rewards
	1. Connect wallet
	2. Click claim rewards — this sends a `claimRewards` transaction

- Emergency Withdraw
	1. Connect wallet
	2. Click emergency withdraw — this calls the `emergencyWithdraw` function on the staking contract

## Deployment

This is a static frontend built with Vite. You can deploy the `dist` output to Vercel, Netlify, GitHub Pages or any static hosting provider.

Example (Vercel)

1. Create a Vercel project from this repository
2. Ensure `pnpm install` is used by setting the install command in Vercel to `pnpm install` (or leave empty to use detected settings)
3. Build command: `pnpm run build`
4. Output directory: `dist`

## Troubleshooting

- Wallet not connecting or projectId errors: Check `src/config/constants.ts` and ensure the `PROJECT_ID` (WalletConnect or other provider id) is valid.
- Wrong network: The app is configured for Sepolia (see `src/config/index.ts`). Switch your wallet to Sepolia or change the chain configuration to the desired network.
- Contract errors (reverts/failures): Confirm that `TOKEN_ADDRESS`, `STAKING_CONTRACT_ADDRESS` and their ABIs in `src/constants/index.ts` match the deployed contracts for the network you're using.
- Transaction not confirmed in UI: If a transaction hash is returned but UI doesn't update, make sure your RPC provider supports transaction receipt polling; the app uses the viem/wagmi public client and ethers JsonRpcProvider for some reads.

## Testing & quality gates

- Build: `pnpm run build` (runs TypeScript build and Vite build)
- Lint: `pnpm run lint`

There are no automated unit tests in this repository by default. Adding tests (Jest/Testing Library or Playwright/Cypress for e2e) is recommended for production-ready deployments.

## Contributing

Contributions are welcome. A suggested workflow:

1. Create a branch: `git checkout -b feat/your-feature`
2. Make changes and run `pnpm run dev` to validate locally
3. Follow the existing TypeScript and ESLint rules
4. Open a pull request against `dev` branch

Before submitting larger changes, open an issue to discuss the design.

## Security

- Do not commit mnemonics, private keys, or secrets. Keep any provider API keys or sensitive values out of source control.
- Use a secure RPC provider for production (and monitor rate limits).

## Where to look next (developer pointers)

- `src/contexts/StakingProvider.tsx` — key contract interactions and app state
- `src/config/index.ts` — wallet / viem / provider setup
- `src/constants/index.ts` — change this to point at your deployed contracts
- `src/components/landingPage` — landing page UI

## License

No license is currently specified in the repository. If this project is intended to be open-source, add a `LICENSE` file (MIT is a common choice).

---

If you'd like, I can:

- Add a `.env`-based configuration option and update the code to read `PROJECT_ID` / `APP_NAME` from environment variables.
- Add a simple CONTRIBUTING.md and CODE_OF_CONDUCT.md
- Create a small smoke test that connects to Sepolia and reads `totalStaked` using viem for CI verification.

Tell me which of these you'd like next.

## Upcoming Features

- Swapping of Staked token rewards to other tokens
- Multi network Staking
- Claiming of NFTs and sales with In App NFT Market Place
- In-App Gaming with claimed rewards and NFTs


