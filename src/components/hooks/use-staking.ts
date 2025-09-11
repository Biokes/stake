import {
  TOKEN_ADDRESS,
  TOKEN_ABI,
  STAKING_CONTRACT_ADDRESS,
  STAKING_CONTRACT_ABI,
} from "@/constants";
import { toast } from "sonner";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";

export interface StakingState {

  isStaking: boolean;
  hasStaked: boolean;
  isApproving: boolean;
  hasApproved: boolean;
  hasWithdrawn: boolean;
  isWithdrawing: boolean;
  isWithdrawingEmergency: boolean;
  hasWithdrawnEmergency: boolean;
}

export function useStaking() {
  const { writeContractAsync } = useWriteContract();
  const stakingState: StakingState = {
    isStaking: false,
    hasStaked: false,
    isApproving: false,
    hasApproved: false,
    isWithdrawing: false,
    hasWithdrawn: false,
    isWithdrawingEmergency: false,
    hasWithdrawnEmergency: false,
    // },
  };

  const stake = async (amount: string) => {
    try {
      stakingState.isStaking = true;
      await writeContractAsync({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "stake",
        args: [BigInt(parseEther(amount))],
      });
      stakingState.isStaking = false;
      stakingState.hasStaked = true;

      toast.success(`You stakes ${amount} successfully`);
    } catch (error) {
      stakingState.isStaking = false;
      toast.error("Something went wrong with staking");
      console.error("Error in staking: ", error);
    }
  };

  const approve = async (amount: string) => {
    try {
      stakingState.isApproving = true;
      await writeContractAsync({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: "approve",
        args: [STAKING_CONTRACT_ADDRESS, parseEther(amount)],
      });
      toast.success(`Successfully approved ${amount}`);
      stakingState.hasApproved = true;
      stakingState.isApproving = false;
    } catch (error) {
      console.error("Error in approve: ", error);
      toast.error("Something went wrong when approving");
      stakingState.isApproving = false;
      stakingState.hasApproved = true;
    }
  };

  const withdraw = async (amount: bigint) => {
    try {
      stakingState.isWithdrawing = true;
      await writeContractAsync({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "withdraw",
        args: [amount],
      });
      stakingState.isWithdrawing = false;
      stakingState.hasWithdrawn = true;

      toast.success("Withdrawal succesful");
    } catch (error) {
      stakingState.isWithdrawing = true;
      console.error("Error in withdrawal: ", error);
      toast.error("Something went wrong when Withdrawing");
    }
  };
  // const getUserBalance = async () => {
  //   try {
  //     stakingState.isWithdrawingEmergency = true;
  //     await writeContractAsync({
  //       address: STAKING_CONTRACT_ADDRESS,
  //       abi: STAKING_CONTRACT_ABI,
  //       functionName: "getUserBalance",
  //       args:[balance]
  //     });
  //     stakingState.isWithdrawingEmergency = false;
  //     stakingState.hasWithdrawnEmergency = true;
  //     toast.success("Emergency Withdrawal Succesful");
  //   } catch (error) {
  //     stakingState.isWithdrawingEmergency = false;
  //     console.error("Error in Emergency withdrawal: ", error);
  //     toast.error("Something went wrong during emergency Withdrawal");
  //   }
  // };
  const emergencyWithdraw = async () => {
    try {
      stakingState.isWithdrawingEmergency = true;
      await writeContractAsync({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "emergencyWithdraw",
      });
      stakingState.isWithdrawingEmergency = false;
      stakingState.hasWithdrawnEmergency = true;
      toast.success("Emergency Withdrawal Succesful");
    } catch (error) {
      stakingState.isWithdrawingEmergency = false;
      console.error("Error in Emergency withdrawal: ", error);
      toast.error("Something went wrong during emergency Withdrawal");
    }
  };
  const claimRewards = async () => {
    try {
      stakingState.isWithdrawingEmergency = true;
      await writeContractAsync({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "claimRewards",
      });
      stakingState.isWithdrawingEmergency = false;
      stakingState.hasWithdrawnEmergency = true;
      toast.success("Reward claiming Succesful");
    } catch (error) {
      stakingState.isWithdrawingEmergency = false;
      console.error("Error in Claiming: ", error);
      toast.error("Something went wrong during Claiming Withdrawal");
    }
  };
  return {
    ...stakingState,
    stake,
    approve,
    withdraw,
    emergencyWithdraw,
    claimRewards,
  };
}
