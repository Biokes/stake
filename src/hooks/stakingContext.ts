import type { ProtocolStats, StakeLog, UserDetails } from "@/lib/types"
import { createContext } from "react"

type StakingContextType = {
    protocolStats: ProtocolStats
    stakes: StakeLog[]

    userDetails: UserDetails
    tokenBalance: bigint
    usersInfo: StakeLog[]

    fetchUserInfo: () => Promise<void>
    approve: (amount: number) => Promise<void>
    stake: (amount: number) => Promise<void>
    claimRewards: () => Promise<void>
    emergencyWithdraw: () => Promise<void>

    setProtocolStats: React.Dispatch<React.SetStateAction<ProtocolStats>>
    setStakes: React.Dispatch<React.SetStateAction<StakeLog[]>>
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>
    setTokenBalance: React.Dispatch<React.SetStateAction<bigint>>
    setUsersInfo: React.Dispatch<React.SetStateAction<StakeLog[]>>

    loading: boolean
    isApproving: boolean
    isStaking: boolean
}

export const StakingContext = createContext<StakingContextType | null>(null)