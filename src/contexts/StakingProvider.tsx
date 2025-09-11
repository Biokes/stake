import { useCallback, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { useAccount, usePublicClient, useWriteContract } from "wagmi"
import type { StakeLog, ProtocolStats, UserDetails } from "@/lib/types"
import { STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS } from "@/config/contracts"
import { toast } from "sonner"
import { StakingContext } from "./StakingContext"

export const StakingProvider = ({ children }: { children: ReactNode }) => {
    const publicClient = usePublicClient()
    const { address } = useAccount()
    const { writeContractAsync } = useWriteContract()

    // States
    const [protocolStats] = useState<ProtocolStats>({
        totalStaked: 0n,
        totalRewards: 0n,
        rewardRate: 0n,
        stakersCount: 0
    })
    const [stakes] = useState<StakeLog[]>([])
    const [userDetails, setUserDetails] = useState<UserDetails>({
        stakeBalance: 0n,
        userReward: 0n,
        lastUpdateTime: 0n,
        rewardRate: 0n
    })
    const [tokenBalance, setTokenBalance] = useState<bigint>(BigInt(0))
    const [usersInfo] = useState<StakeLog[]>([])
    const [loading, setLoading] = useState(false)
    const [isApproving, setIsApproving] = useState(false)
    const [isStaking, setIsStaking] = useState(false)

    // Fetch user's token balance
    const fetchTokenBalance = useCallback(async () => {
        if (!address || !publicClient) return
        try {
            const balance = await publicClient.readContract({
                address: TOKEN_CONTRACT_ADDRESS,
                abi: TOKEN_CONTRACT_ABI,
                functionName: 'balanceOf',
                args: [address]
            })
            setTokenBalance(balance as bigint)
        } catch (error) {
            console.error('Error fetching balance:', error)
        }
    }, [address, publicClient])

    // Fetch user's staking info
    const fetchUserInfo = useCallback(async () => {
        if (!address || !publicClient) return
        try {
            const details = await publicClient.readContract({
                address: STAKING_CONTRACT_ADDRESS,
                abi: STAKING_CONTRACT_ABI,
                functionName: 'getUserDetails',
                args: [address],
            })
            setUserDetails(details as UserDetails)
        } catch (error) {
            console.error('Error fetching user details:', error)
        }
    }, [address, publicClient])

    // Approve and stake tokens
    const approveAndStake = useCallback(async (amount: number) => {
        if (!address) return
        setLoading(true)
        try {
            // First approve
            setIsApproving(true)
            const approveHash = await writeContractAsync({
                address: TOKEN_CONTRACT_ADDRESS,
                abi: TOKEN_CONTRACT_ABI,
                functionName: 'approve',
                args: [STAKING_CONTRACT_ADDRESS, BigInt(amount)],
            })

            // Wait for approval confirmation
            if (!publicClient) throw new Error('Public client not available')
            await publicClient.waitForTransactionReceipt({ hash: approveHash })
            setIsApproving(false)

            // Then stake
            setIsStaking(true)
            const stakeHash = await writeContractAsync({
                address: STAKING_CONTRACT_ADDRESS,
                abi: STAKING_CONTRACT_ABI,
                functionName: 'stake',
                args: [BigInt(amount)],
            })

            await publicClient.waitForTransactionReceipt({ hash: stakeHash })
            toast.success('Successfully staked tokens')

            // Refresh data
            await Promise.all([fetchUserInfo(), fetchTokenBalance()])
        } catch (error) {
            console.error('Error in approve and stake:', error)
            toast.error('Failed to stake tokens')
        } finally {
            setLoading(false)
            setIsApproving(false)
            setIsStaking(false)
        }
    }, [address, writeContractAsync, publicClient, fetchUserInfo, fetchTokenBalance])

    // Claim rewards
    const claimRewards = useCallback(async () => {
        if (!address) return
        try {
            if (!publicClient) throw new Error('Public client not available')
            const hash = await writeContractAsync({
                address: STAKING_CONTRACT_ADDRESS,
                abi: STAKING_CONTRACT_ABI,
                functionName: 'claimRewards',
            })
            toast.success("Your reward claim has been submitted")
            await publicClient.waitForTransactionReceipt({ hash })
            await fetchUserInfo()
        } catch (error) {
            toast.error("Failed to claim rewards")
            console.error('Error claiming rewards:', error)
        }
    }, [address, writeContractAsync, publicClient, fetchUserInfo])

    // Emergency withdraw
    const emergencyWithdraw = useCallback(async () => {
        if (!address) return
        try {
            if (!publicClient) throw new Error('Public client not available')
            const hash = await writeContractAsync({
                address: STAKING_CONTRACT_ADDRESS,
                abi: STAKING_CONTRACT_ABI,
                functionName: 'emergencyWithdraw',
            })
            toast.success("Emergency withdrawal has been submitted")
            await publicClient.waitForTransactionReceipt({ hash })
            await Promise.all([fetchUserInfo(), fetchTokenBalance()])
        } catch (error) {
            toast.error("Failed to emergency withdraw")
            console.error('Error emergency withdrawing:', error)
        }
    }, [address, writeContractAsync, publicClient, fetchUserInfo, fetchTokenBalance])

    // const fetchProtocolStats = useCallback(async () => {
    //     if (!publicClient) return
    //     try {
    //         const [totalStaked, rewardRate, totalRewards] = await Promise.all([
    //             publicClient.readContract({
    //                 address: STAKING_CONTRACT_ADDRESS,
    //                 abi: STAKING_CONTRACT_ABI,
    //                 functionName: "totalStaked"
    //             }),
    //             publicClient.readContract({
    //                 address: STAKING_CONTRACT_ADDRESS,
    //                 abi: STAKING_CONTRACT_ABI,
    //                 functionName: "currentRewardRate"
    //             }),
    //             publicClient.readContract({
    //                 address: STAKING_CONTRACT_ADDRESS,
    //                 abi: STAKING_CONTRACT_ABI,
    //                 functionName: "getTotalRewards"
    //             }),
    //         ])

    //         setProtocolStats({
    //             totalStaked: totalStaked as bigint,
    //             totalRewards: totalRewards as bigint,
    //             rewardRate: rewardRate as bigint,
    //             stakersCount: 0 // you'll need to track this from logs or extend contract
    //         })
    //     } catch (err) {
    //         console.error("Error fetching protocol stats:", err)
    //     }
    // }, [publicClient])


    // Effect to fetch initial data
    useEffect(() => {
        if (address) {
            Promise.all([
                fetchUserInfo(),
                fetchTokenBalance()
            ])
        }
    }, [address, fetchUserInfo, fetchTokenBalance])

    // Effect to listen for events and update data
    useEffect(() => {
        if (!address || !publicClient) return

        const unwatch = publicClient.watchContractEvent({
            address: STAKING_CONTRACT_ADDRESS,
            abi: STAKING_CONTRACT_ABI,
            eventName: 'Staked',
            onLogs: () => {
                fetchUserInfo()
                fetchTokenBalance()
            },
        })

        return () => {
            unwatch()
        }
    }, [address, publicClient, fetchUserInfo, fetchTokenBalance])

    // Provide the context value
    const value = {
        protocolStats,
        stakes,
        userDetails,
        tokenBalance,
        usersInfo,
        fetchUserInfo,
        approveAndStake,
        claimRewards,
        emergencyWithdraw,
        loading,
        isApproving,
        isStaking
    }

    return (
        <StakingContext.Provider value={value}>
            {children}
        </StakingContext.Provider>
    )
}
