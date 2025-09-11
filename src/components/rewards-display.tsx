"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gift, TrendingUp, Clock } from "lucide-react"
import { useStakingContext } from "@/hooks/useStakingContext"
import { formatEther } from "viem"

export function RewardsDisplay() {
  const { userDetails, protocolStats } = useStakingContext()
  const formattedUserReward = Number(formatEther(userDetails.userReward))
  const apr = Number(protocolStats.rewardRate) / 1e18 * 100
  const lastUpdateTime = Number(userDetails.lastUpdateTime)
  const progressValue = Math.min(((Date.now() / 1000 - lastUpdateTime) / 86400) * 100, 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gift className="h-5 w-5" />
          <span>Staking Rewards</span>
        </CardTitle>
        <CardDescription>Track and claim your staking rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Pending Rewards</span>
              <Badge variant="outline">{apr.toFixed(2)}% APR</Badge>
            </div>
            <p className="text-2xl font-bold text-foreground">{formattedUserReward.toFixed(4)} RFK</p>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              Updated {Math.floor((Date.now() / 1000 - lastUpdateTime) / 60)} minutes ago
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Staked</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {Number(formatEther(userDetails.stakeBalance)).toFixed(4)} RFK
            </p>
            <p className="text-sm text-muted-foreground mt-2">Your current stake</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reward Progress</span>
            <span className="text-foreground">{progressValue.toFixed(0)}%</span>
          </div>
          <Progress value={progressValue} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Rewards accrue continuously, claim at any time
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
