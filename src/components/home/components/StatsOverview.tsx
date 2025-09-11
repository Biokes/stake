import { DollarSign, TrendingUp, Users, Layers } from "lucide-react"
import { StatCard } from "./StatCard"
import { useStakingContext } from "@/hooks/useStakingContext"
import { useAccount } from "wagmi"

export function StatsOverview() {
  const { isConnected } = useAccount()
  const { protocolStats } = useStakingContext()
  const { totalStaked, rewardRate, totalRewards, stakersCount } = protocolStats
  
  const formattedTotalStaked = (Number(totalStaked) / 1e18).toFixed(2)
  const formattedTotalRewards = (Number(totalRewards) / 1e18).toFixed(2)
  const currentAPR = (Number(rewardRate) / 1e18 * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={DollarSign}
        label="Total Reward"
        value={`${formattedTotalRewards} RFK`}
      />
      <StatCard
        icon={TrendingUp}
        label="Current APR"
        value={`${currentAPR}%`}
      />
      <StatCard
        icon={Users}
        label="Active Stakers"
        value={stakersCount}
        subtext={isConnected ? "Total number of active stakers" : "Protocol not connected"}
      />
      <StatCard
        icon={Layers}
        label="Total Stakes"
        value={`${formattedTotalStaked} RFK`}
        subtext="Total amount of tokens staked"
      />
    </div>
  )
}
