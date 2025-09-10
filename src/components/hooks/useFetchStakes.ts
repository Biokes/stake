import {
  ethersJsonRpcProvider,
  stakingContract,
  viemClient,
} from "./../../config/index";
import { STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS } from "@/constants";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export interface UserInfo {
  stakedAmount: bigint;
  lastStakeTimestamp: bigint;
  rewardDebt: bigint;
  pendingRewards: bigint;
}
export interface StakeLog {
  address: string;
  amount: bigint;
  timestamp: bigint;
  newTotalStaked: bigint;
  currentRewardRate: bigint;
}
export interface UserInfoWithAddress {
  address: string;
  info: UserInfo;
}

export const useFetchStakes = () => {
  const { address } = useAccount();
  const [usersInfo, setUserInfo] = useState<UserInfoWithAddress[]>([]);
  const fetchUserInfo = useCallback(async () => {
    if (!address) return;
    try {
      const lastBlock = await ethersJsonRpcProvider.getBlockNumber();
      const usersInfo = await stakingContract.queryFilter(
        "Staked",
        lastBlock - 10000,
        "latest"
      );
      console.log("Fetched usersInfo: ", usersInfo);
      // setUserInfo([]);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong fetching staking positions");
    }
  }, [address]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    if (!address) return;
    const unwatch = viemClient.watchContractEvent({
      address: STAKING_CONTRACT_ADDRESS,
      abi: STAKING_CONTRACT_ABI,
      eventName: "Staked",
      onLogs: (logs) => {
        logs.forEach((log) => {
          console.log(log);
          const stakeProps = log.args as StakeLog
          toast.success(`${stakeProps.amount.toString()} staked  tokens now.`);
          fetchUserInfo();
        });
      },
    });

    return () => {
      unwatch?.();
    };
  }, [client, address, fetchUserInfo]);

  return { usersInfo, fetchUserInfo };
};
