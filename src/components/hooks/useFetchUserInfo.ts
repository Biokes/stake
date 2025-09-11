import { STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS } from "@/constants";
import type { UserDetails } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
// import { toast } from "sonner";
import type { Hex } from "viem";
import { useAccount, usePublicClient } from "wagmi";

export const useFetchUserInfo = () => {
  const client = usePublicClient();
  const { address } = useAccount();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    stakedAmount: 0,
    lastStakeTimestamp: 0,
    pendingRewards: 0,
    timeUntilUnlock: 0,
    canWithdraw: false,
  });
  const fetch = useCallback(async () => {
    if (address) {
      try {
        const data = await client?.readContract({
          abi: STAKING_CONTRACT_ABI,
          address: STAKING_CONTRACT_ADDRESS,
          functionName: "getUserDetails",
          args: [address as Hex],
        });
        setUserDetails({
          stakedAmount: Number(data?.stakedAmount),
          lastStakeTimestamp: Number(data?.lastStakeTimestamp),
          pendingRewards: Number(data?.pendingRewards),
          timeUntilUnlock: Number(data?.timeUntilUnlock),
          canWithdraw: data?.canWithdraw ?? false,
        });
      } catch (error) {
        console.error("user details fetch error: ", error);
      }
    }
  }, [address, client]);
  useEffect(() => {
    fetch();
  }, [fetch]);

  return { userDetails };
};
