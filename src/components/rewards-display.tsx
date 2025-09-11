"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gift, TrendingUp, Clock } from "lucide-react"
import { useRewards } from "./hooks/use-Rewards"
  // import { useProtocolStats } from "./hooks/use-protocol-stats"
import { useFetchUserInfo } from "./hooks/useFetchUserInfo"
import { formatTimeRemaining } from "@/lib/utils"

export function RewardsDisplay() {
  const { pendingRewards, totalEarned } = useRewards()
    const { userDetails } = useFetchUserInfo()
  const TEN_DAYS_SECONDS = 864_000;
  const progressValue = Math.round(((TEN_DAYS_SECONDS - userDetails.timeUntilUnlock) / TEN_DAYS_SECONDS) * 100);

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
              <Badge variant="outline">10% APR</Badge>
            </div>
            <p className="text-2xl font-bold text-foreground">{pendingRewards} RFK</p>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              Next reward in {formatTimeRemaining(BigInt(Math.floor(Date.now() / 1000)) + BigInt(userDetails.timeUntilUnlock))}
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Earned</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-foreground">{totalEarned} RFK</p>
            <p className="text-sm text-muted-foreground mt-2">Lifetime earnings from staking</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reward Progress</span>
            <span className="text-foreground">{progressValue}%</span>
          </div>
          <Progress value={progressValue} className="h-2" />
          <p className="text-xs text-muted-foreground">Next reward distribution in {formatTimeRemaining(BigInt(Math.floor(Date.now() / 1000)) + BigInt(userDetails.timeUntilUnlock))}</p>
        </div>

        {/* <Button className="w-full" onClick={claimRewards}>
          <Gift className="mr-2 h-4 w-4" />
          Claim Rewards ({pendingRewards} RFK)
        </Button> */}
      </CardContent>
    </Card>
  )
}
