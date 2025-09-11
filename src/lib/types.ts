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
export interface UserDetails {
  stakedAmount: number;
  lastStakeTimestamp: number;
  pendingRewards: number;
  timeUntilUnlock: number;
  canWithdraw: boolean;
}


export interface RewardsState {
  pendingRewards: string
  totalEarned: string
  nextRewardTime: number
  currentAPR: string
}
export interface ProtocolStats {
  totalReward: number;
  averageAPR: number;
  totalStaked: number;
    rewardRate: number;
    stakes:StakeLog[]
}
