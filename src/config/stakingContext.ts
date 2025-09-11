// import { createContext, useContext, ReactNode } from "react"
// import { useBalance } from "@/hooks/useBalance"
// import { useProtocolStats } from "@/hooks/use-protocol-stats"
// import { useFetchStakes } from "@/hooks/useFetchStakes"
// import { useFetchUserInfo } from "@/hooks/useFetchUserInfo"
// import { useStaking } from "@/hooks/use-staking"

// type StakingContextType = {
//   balance: number
//   protocolStats: ReturnType<typeof useProtocolStats>
//   usersInfo: ReturnType<typeof useFetchStakes>["usersInfo"]
//   userDetails: ReturnType<typeof useFetchUserInfo>["userDetails"]
//   stakingActions: ReturnType<typeof useStaking>
// }

// const StakingContext = createContext<StakingContextType | null>(null)

// export function StakingProvider({ children }: { children: ReactNode }) {
//   const { tokenBalance: balance } = useBalance()
//   const protocolStats = useProtocolStats()
//   const { usersInfo } = useFetchStakes()
//   const { userDetails } = useFetchUserInfo()
//   const stakingActions = useStaking()

//   return (
//     <StakingContext.Provider
//       value={{
//         balance,
//         protocolStats,
//         usersInfo,
//         userDetails,
//         stakingActions,
//       }}
//     >
//       {children}
//     </StakingContext.Provider>
//   )
// }

// export function useStakingContext() {
//   const ctx = useContext(StakingContext)
//   if (!ctx) throw new Error("useStakingContext must be used inside StakingProvider")
//   return ctx
// }a
