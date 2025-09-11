import { stakingContract } from "@/config";
import { STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI } from "@/constants";
import type { ProtocolStats, StakeLog } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { formatEther, type Hex } from "viem";
import { usePublicClient } from "wagmi";
import { useFetchStakes } from "./useFetchStakes";

export function useProtocolStats() {
  const client = usePublicClient();
  const [stakes, setStakesHistory] = useState<StakeLog[]>([]);
  const [protocolStats, setProtocolStats] = useState<ProtocolStats>({
    totalReward: 0,
    averageAPR: 0,
    totalStaked: 0,
    rewardRate: 0,
    stakes: stakes,
  });
  const { usersInfo } = useFetchStakes();

  const totalRewards = useCallback(async () => {
    try {
      const uniqueUsers = Object.values(
        usersInfo.reduce((acc, log) => {
          acc[log.address] = log;
          return acc;
        }, {} as Record<string, StakeLog>)
      );
      uniqueUsers.forEach(async (data) => {
        const rewards = await client?.readContract({
          abi: STAKING_CONTRACT_ABI,
          address: STAKING_CONTRACT_ADDRESS,
          functionName: "getPendingRewards",
          args: [data.address as Hex],
        });
        setProtocolStats({...protocolStats,totalReward: protocolStats.totalReward+=Number(formatEther(rewards?? 0n))})
      });
    } catch (error) {
      console.error("Active stakers error: ", error);
      return 0;
    }
  }, [client, protocolStats, usersInfo]);

  const totalReward = useCallback(async () => {
    try {
      const data = await client?.readContract({
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: "totalStaked",
      });
      return Number(formatEther(data ?? 0n));
    } catch (error) {
      console.error("Stake error: ", error);
      return 0;
    }
  }, [client]);

  const rewardRate = useCallback(async () => {
    try {
      const data = await client?.readContract({
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: "currentRewardRate",
      });
      return Number(data ?? 0);
    } catch (error) {
      console.error("Reward rate error: ", error);
      return 0;
    }
  }, [client]);

  const fetchStats = useCallback(async () => {
    try {
      const [staked, rewards, rate] = await Promise.all([
        totalReward(),
        totalRewards(),
        rewardRate(),
      ]);

      setProtocolStats({
        totalReward: rewards??0,
        averageAPR: 10,
        totalStaked: staked,
        rewardRate: rate,
        stakes: stakes,
      });
    } catch (error) {
      console.log("Fetch stats error: ", error);
      toast.error("Error fetching protocol stats");
    }
  }, [rewardRate, stakes, totalReward, totalRewards]);

  useEffect(() => {
    fetchStats();
  }, [client, fetchStats]);

  const stakeFilter = (
    user: string,
    amount: bigint,
    timestamp: bigint,
    newTotalStaked: bigint,
    currentRewardRate: bigint
  ) => {
    setStakesHistory((prev) => [
      ...prev,
      {
        address: user,
        amount: amount,
        timestamp: timestamp,
        newTotalStaked: newTotalStaked,
        currentRewardRate: currentRewardRate,
      },
    ]);
  };
  useEffect(() => {
    stakingContract.on("Staked", stakeFilter);
    return () => {
      stakingContract.on("Staked", stakeFilter);
    };
  }, []);
  return protocolStats;
}
