import type { IconType } from "react-icons/lib";

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
    stakedAmount: bigint;
    lastStakeTimestamp: bigint;
    pendingRewards: bigint;
    timeUntilUnlock: bigint;
    canWithdraw: boolean;
}


export interface RewardsState {
  pendingRewards: string
  totalEarned: string
  nextRewardTime: number
  currentAPR: string
}
export interface ProtocolStats {
  totalStaked: bigint;
  totalRewards: bigint;
  rewardRate: bigint;
  stakersCount: number;
}
export type CardProps = {
    header: string,
    body: string
}

export type WorkingProps = {
    icon: IconType,
    texts: CardProps
}