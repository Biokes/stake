import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { usePublicClient } from "wagmi";
import { STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS } from "@/config/contracts";
import type { ProtocolStats } from "@/lib/types";

export function useProtocolStats() {
  const client = usePublicClient();
  const [protocolStats, setProtocolStats] = useState<ProtocolStats>({
    totalStaked: 0n,
    totalRewards: 0n,
    rewardRate: 0n,
    stakersCount: 0
  });

  const getTotalRewards = useCallback(async () => {
    if (!client) return 0n;
    try {
      const data = await client.readContract({
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: "totalRewards",
      });
      return data as bigint;
    } catch (error) {
      console.error("Total rewards error: ", error);
      return 0n;
    }
  }, [client]);

  const getTotalStaked = useCallback(async () => {
    if (!client) return 0n;
    try {
      const data = await client.readContract({
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: "totalStaked",
      });
      return data as bigint;
    } catch (error) {
      console.error("Total staked error: ", error);
      return 0n;
    }
  }, [client]);

  const getRewardRate = useCallback(async () => {
    if (!client) return 0n;
    try {
      const data = await client.readContract({
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: "rewardRate",
      });
      return data as bigint;
    } catch (error) {
      console.error("Reward rate error: ", error);
      return 0n;
    }
  }, [client]);

  const fetchStats = useCallback(async () => {
    try {
      const [totalStaked, totalRewards, rewardRate] = await Promise.all([
        getTotalStaked(),
        getTotalRewards(),
        getRewardRate(),
      ]);

      setProtocolStats({
        totalStaked,
        totalRewards,
        rewardRate,
        stakersCount: 0
      });
    } catch (error) {
      console.log("Fetch stats error: ", error);
      toast.error("Error fetching protocol stats");
    }
  }, [getTotalStaked, getTotalRewards, getRewardRate]);

  useEffect(() => {
    fetchStats();
    
    if (!client) return;
    
    const unwatch = client.watchContractEvent({
      address: STAKING_CONTRACT_ADDRESS,
      abi: STAKING_CONTRACT_ABI,
      eventName: 'Staked',
      onLogs: () => {
        fetchStats();
      },
    });

    return () => {
      unwatch();
    };
  }, [client, fetchStats]);

  return protocolStats;
}
