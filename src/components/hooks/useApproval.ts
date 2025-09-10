import {
  STAKING_CONTRACT_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
  STAKING_CONTRACT_ABI,
} from "@/constants";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { decodeEventLog } from "viem";

export const useApproveAndStakeToken = (amount: number) => {
  const { writeContractAsync } = useWriteContract();

  const [approveHash, setApproveHash] = useState<`0x${string}` | undefined>();
  const [stakeHash, setStakeHash] = useState<`0x${string}` | undefined>();
  const [loading, setLoading] = useState(false);

  const { isSuccess: isApproveConfirmed } = useWaitForTransactionReceipt({
    hash: approveHash,
  });
  const { data: stakeReceipt, isSuccess: isStakeConfirmed } =
    useWaitForTransactionReceipt({ hash: stakeHash });

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      const approveTx = await writeContractAsync({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: "approve",
        args: [STAKING_CONTRACT_ADDRESS, BigInt(amount)],
      });
      setApproveHash(approveTx);
      toast.success("Approval submitted,Please wait for staking confirmation");
    } catch (err) {
      setLoading(false);
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong during approval";
      toast.error(message);
      console.error("Approval error: ", err);
    }
  }, [amount, writeContractAsync]);

  useEffect(() => {
    const stake = async () => {
      try {
        const stakeTx = await writeContractAsync({
          address: STAKING_CONTRACT_ADDRESS,
          abi: STAKING_CONTRACT_ABI,
          functionName: "stake",
          args: [BigInt(amount)],
        });
        setStakeHash(stakeTx);
        toast.success("Staking submitted");
      } catch (err) {
        setLoading(false);
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong during stake";
        toast.error(message);
        console.error("Submission error: ", err);
      }
    };

    if (isApproveConfirmed && !stakeHash) {
      stake();
    }
  }, [isApproveConfirmed, amount, writeContractAsync, stakeHash]);

  useEffect(() => {
    if (isStakeConfirmed && stakeReceipt) {
      try {
        for (const log of stakeReceipt.logs) {
          try {
            const decoded = decodeEventLog({
              abi: STAKING_CONTRACT_ABI,
              data: log.data,
              topics: log.topics,
            });

            if (decoded.eventName === "Staked") {
              const { amount: stakedAmount } = decoded.args as {
                user: string;
                amount: bigint;
              };

              toast.success(
                `successfully staked ${Number(stakedAmount)} tokens`
              );
              break;
            }
          } catch (error) {
            console.error("logs error: ", error);
          }
        }
      } catch (err) {
        console.error("Error decoding logs", err);
      } finally {
        setLoading(false);
      }
    }
  }, [isStakeConfirmed, stakeReceipt]);

  return { execute, loading, isStakeConfirmed };
};
