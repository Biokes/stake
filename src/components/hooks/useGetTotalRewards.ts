import { STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS } from "@/constants";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { usePublicClient } from "wagmi";

export const useGetTotalRewards = () => { 
  const client = usePublicClient();
  const [totalRewards, setTotalRewards] = useState(0);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        if (!client) return;
        const rewards = await client.readContract({
          abi: STAKING_CONTRACT_ABI,
          address: STAKING_CONTRACT_ADDRESS,
          functionName: "getTotalRewards"
        });
        setTotalRewards(Number(rewards));
      } catch (error) { 
        console.log(error);
        toast.error("An error occurred getting TotalRewards");
      }
    };

    fetchRewards();
  }, [client]);

  return { totalRewards };
};
