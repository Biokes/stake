import { ethers } from "ethers";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {  sepolia } from "viem/chains";
import { APP_NAME, PROJECT_ID } from "./constants";
import { createPublicClient , http} from "viem";
import { STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS } from "@/constants";

export const  config = getDefaultConfig({
  appName: APP_NAME,
  projectId: PROJECT_ID,
  chains: [sepolia]
});

export const viemClient = createPublicClient({
  chain: sepolia,
  transport: http()
})
export const ethersJsonRpcProvider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com")
export const stakingContract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI, ethersJsonRpcProvider)
