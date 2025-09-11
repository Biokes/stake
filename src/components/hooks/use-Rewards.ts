"use client"

export interface RewardsState {
  pendingRewards: string
  totalEarned: string
  nextRewardTime: number
  currentAPR: string
}

export function useRewards() {
  const rewardsState: RewardsState = {
    pendingRewards: "0",
    totalEarned: "0",
    nextRewardTime: 0,
    currentAPR: "0",
  }
    // const pendingRewards = async () => { 
        
    // }
  const claimRewards = async () => {

  }

  return {
    ...rewardsState,
    claimRewards,
  }
}