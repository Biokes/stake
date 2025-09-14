import { Card, CardContent } from "@/components/ui/card"
import { formatEther } from "viem"
import { useStakingContext } from "@/hooks/useStakingContext"
import { useEffect } from "react"

export function QuickStats() {
  const { userDetails } = useStakingContext()
  const formattedStakeBalance = formatEther(userDetails.stakedAmount)
  const formattedUserReward = formatEther(userDetails.pendingRewards)
    useEffect(() => {
        // fetchTokenBalance()
     },[])
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-medium text-foreground mb-3">Quick Stats</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Your Stake:</span>
            <span className="font-medium text-foreground">
              {parseFloat(formattedStakeBalance).toFixed(4)} RFK
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current Payable Rewards:</span>
            <span className="font-medium text-primary">
              {parseFloat(formattedUserReward).toFixed(4)} RFK
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Rewards payouts</span>
            <span className="font-medium text-primary">
              0 RFK
            </span>
          </div>
           <div className="flex justify-between">
            <span className="text-muted-foreground">Total WIthdrawal payouts</span>
            <span className="font-medium text-primary">
              0 RFK
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
