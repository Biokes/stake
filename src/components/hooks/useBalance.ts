import { formatEther } from "viem";
import { TOKEN_ABI, TOKEN_ADDRESS } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";

export const useBalance = () => {
  const client = usePublicClient();
  const { address } = useAccount();
  const [tokenBalance, setBalance] = useState<bigint>(BigInt(0));
  const fetchTokenBalance = useCallback(async () => {
    if (!client) return;
    if (address) {
      try {
        const balance = (await client?.readContract({
          address: TOKEN_ADDRESS,
          abi: TOKEN_ABI,
          functionName: "balanceOf",
          args: [`0x${address?.substring(2)}`],
        })) as bigint;
        setBalance(balance);
      } catch (error) {
        console.log(error);
      }
    }
  }, [address, client]);

  useEffect(() => {
    fetchTokenBalance();
  }, [fetchTokenBalance]);
  const returnValue = Number(formatEther(tokenBalance));
  return { tokenBalance: returnValue };
};
