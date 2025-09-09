import { STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS } from "@/constants";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { usePublicClient, useAccount } from "wagmi";

export interface UserInfo {
  stakedAmount: bigint;
  lastStakeTimestamp: bigint;
  rewardDebt: bigint;
  pendingRewards: bigint;
}

export interface UserInfoWithAddress {
  address: string;
  info: UserInfo;
}

export const useFetchStakes = () => {
  const client = usePublicClient();
  const { address } = useAccount();
  const [usersInfo, setUserInfo] = useState<UserInfoWithAddress[]>([]);

  const fetchUserInfo = useCallback(async () => {
    if (!client || !address) return;
    try {
      const usersInfo = await client.readContract({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "userInfo",
        args: [address],
      });
      console.log("usersInfo: ", usersInfo);
      setUserInfo([]);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong fetching staking positions");
    }
  }, [address, client]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    if (!client || !address) return;
    const unwatch = client.watchContractEvent({
      address: STAKING_CONTRACT_ADDRESS,
      abi: STAKING_CONTRACT_ABI,
      eventName: "Staked",
      onLogs: (logs) => {
        logs.forEach((log) => {
          console.log(log)
          const stakeProps = log.args as {
            address: string,
            amount: bigint;
            timestamp: bigint;
            newTotalStaked: bigint;
            currentRewardRate: bigint
          };
            toast.success(`${address == stakeProps.address ? "You" : stakeProps.address.substring(0,4) + "..." } staked ${stakeProps.amount.toString()} tokens now.`);
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
