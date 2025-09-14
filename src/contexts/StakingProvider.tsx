import { useCallback, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { useAccount, usePublicClient, useWriteContract } from "wagmi"
import type { StakeLog, ProtocolStats, UserDetails } from "@/lib/types"
import { STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS } from "@/constants"
import { toast } from "sonner"
import { StakingContext } from "./StakingContext"
import { parseAbiItem, parseEther } from "viem"
import { stakingContract } from "@/config"
import { formatEther, type ethers } from "ethers"

export const StakingProvider = ({ children }: { children: ReactNode }) => {
    const publicClient = usePublicClient()
    const { address } = useAccount()
    const { writeContractAsync } = useWriteContract()

    const [protocolStats, setProtocolStats] = useState<ProtocolStats>({
        totalStaked: 0n,
        totalRewards: 0n,
        rewardRate: 0n,
        stakersCount: 0
    })
    const [stakes] = useState<StakeLog[]>([])
    const [userDetails, setUserDetails] = useState<UserDetails>({
        stakedAmount: 0n,
        lastStakeTimestamp: 0n,
        pendingRewards: 0n,
        timeUntilUnlock: 0n,
        canWithdraw: false
    })
    const [tokenBalance, setTokenBalance] = useState<bigint>(BigInt(0))
    const [usersInfo] = useState<StakeLog[]>([])
    const [loading, setLoading] = useState(false)
    const [isApproving, setIsApproving] = useState(false)
    const [isStaking, setIsStaking] = useState(false)

    const fetchTokenBalance = useCallback(async () => {
        if (!address || !publicClient) return
        try {
            const balance = await publicClient.readContract({
                address: TOKEN_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'balanceOf',
                args: [address]
            })
            setTokenBalance(balance as bigint)
        } catch (error) {
            console.error('Error fetching balance:', error)
        }
    }, [address, publicClient])

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

    const approve = useCallback(async (amount: number) => {
        if (!address) return
        setLoading(true)
        try {
            setIsApproving(true)
            const approveHash = await writeContractAsync({
                address: TOKEN_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'approve',
                args: [STAKING_CONTRACT_ADDRESS, parseEther(String(amount))],
            })

            if (!publicClient) throw new Error('Public client not available')
            await publicClient.waitForTransactionReceipt({ hash: approveHash })
            setIsApproving(false)
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

    const stake = useCallback(async (amount: number) => {
        if (!publicClient || !address) return
        try {
            setIsStaking(true)
            const stakeHash = await writeContractAsync({
                address: STAKING_CONTRACT_ADDRESS,
                abi: STAKING_CONTRACT_ABI,
                functionName: 'stake',
                args: [parseEther(String(amount))],
            })
            await publicClient.waitForTransactionReceipt({ hash: stakeHash })
            toast.success('Successfully staked tokens')
            setIsStaking(false)
        }
        catch (error) {
            setIsStaking(false)
            toast.error("An error occurred during taking")
            console.error("stake error: ", error);
        }
    }, [address, publicClient, writeContractAsync])
    const claimRewards = useCallback(async () => {
        if (!address) return
        try {
            if (!publicClient) return
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

    const emergencyWithdraw = useCallback(async () => {
        if (!address) return
        try {
            if (!publicClient) throw new Error('Public client not available')
            const hash = await writeContractAsync({
                address: STAKING_CONTRACT_ADDRESS,
                abi: STAKING_CONTRACT_ABI,
                functionName: 'emergencyWithdraw',
            })
            await publicClient.waitForTransactionReceipt({ hash })
            toast.success("Emergency withdrawal Successfull")
            await Promise.all([fetchUserInfo(), fetchTokenBalance()])
        } catch (error) {
            toast.error("Failed to make emergency withdraw")
            console.error('Error emergency withdrawing:', error)
        }
    }, [address, writeContractAsync, publicClient, fetchUserInfo, fetchTokenBalance])

    useEffect(() => {
        if (address) {
            Promise.all([
                fetchUserInfo(),
                fetchTokenBalance()
            ])
        }
    }, [address, fetchUserInfo, fetchTokenBalance])

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

    const fetchProtocolStats = useCallback(async () => {
        try {
            const totalStaked = await publicClient?.readContract({
                abi: STAKING_CONTRACT_ABI,
                functionName: "totalStaked",
                address: STAKING_CONTRACT_ADDRESS
            })
            const currentRewardRate = await publicClient?.readContract({
                abi: STAKING_CONTRACT_ABI,
                functionName: "currentRewardRate",
                address: STAKING_CONTRACT_ADDRESS
            })
            setProtocolStats({ ...protocolStats, totalStaked: totalStaked ?? 0n, rewardRate: currentRewardRate ?? 0n })
        } catch (error) {
            console.error("fetch protoocol stats error: ", error)
        }
    }, [protocolStats, publicClient])

    useEffect(() => {
        const handler = (
            user: string,
            amount: ethers.BigNumberish,
            timestamp: ethers.BigNumberish,
            newTotalStaked: ethers.BigNumberish,
            currentRewardRate: ethers.BigNumberish
        ) => {
            toast.success(`${user.substring(0, 4)}... staked ${formatEther(amount).substring(0, 5)} RFKs`);
            if (user.toLowerCase() === address?.toLowerCase()) {
                setUserDetails({
                    ...userDetails,
                    stakedAmount: BigInt(newTotalStaked.toString()),
                    lastStakeTimestamp: BigInt(timestamp.toString())
                });

                setProtocolStats({
                    ...protocolStats,
                    rewardRate: BigInt(currentRewardRate.toString()),
                });
            }
        };

        publicClient?.watchEvent({
            address: STAKING_CONTRACT_ADDRESS,
            event: parseAbiItem("event Staked(address indexed user, uint256 amount, uint256 timestamp, uint256 newTotalStaked, uint256 currentRewardRate)"),
            onLogs: (logs) => {
                console.log("logs:", logs)
            }
        })

        fetchProtocolStats();

        return () => {
            stakingContract.off("Staked", handler);
        };
    }, [address, fetchProtocolStats, protocolStats, publicClient, userDetails]);

    const value = {
        protocolStats,
        stakes,
        userDetails,
        tokenBalance,
        usersInfo,
        fetchUserInfo,
        approve,
        claimRewards,
        emergencyWithdraw,
        loading,
        isApproving,
        isStaking,
        stake
    }

    return (
        <StakingContext.Provider value={value}>
            {children}
        </StakingContext.Provider>
    )
}