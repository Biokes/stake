import { createContext } from 'react'
import type { StakeLog, ProtocolStats, UserDetails } from '@/lib/types'

export type StakingContextType = {
  // Protocol Stats
  protocolStats: ProtocolStats
  stakes: StakeLog[]
  
  // User Data
  userDetails: UserDetails
  tokenBalance: bigint
  usersInfo: StakeLog[]
  
  // Actions
  fetchUserInfo: () => Promise<void>
  approve: (amount: number) => Promise<void>
  claimRewards: () => Promise<void>
  emergencyWithdraw: () => Promise<void>
  stake: (amount:number)=>Promise<void>
  
  // Loading States
  loading: boolean
  isApproving: boolean
  isStaking: boolean
}

export const StakingContext = createContext<StakingContextType | null>(null)
