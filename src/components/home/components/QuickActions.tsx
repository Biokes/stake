import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { formatEther } from "viem"
import { useStakingContext } from "@/hooks/useStakingContext"
import { useAccount } from "wagmi"

export function QuickActions() {
  const { userDetails, claimRewards, emergencyWithdraw } = useStakingContext()
  const formattedUserReward = formatEther(userDetails.pendingRewards)
  const isWithdrawable = userDetails.canWithdraw
  const {address} = useAccount()
  return (
    <Card className="border border-border bg-muted/30">
      <CardContent className="py-6 px-4">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Withdrawal Options</p>
          </div>

          <div className="space-y-3">
            <Card className="p-3 bg-card border-primary/20">
              <div className="space-y-3">
                <div className="bg-muted p-2 rounded text-center">
                  <p className="text-xs text-foreground font-medium">
                    Your Current Claimable Reward
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1">
                    {parseFloat(formattedUserReward).toFixed(4)} RFK
                  </p>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={userDetails.pendingRewards <= 0n}
                  onClick={() => claimRewards()}
                >
                  Claim Rewards
                </Button>
              </div>
            </Card>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={!isWithdrawable }
              // onClick={() => with()}
            >
              withdraw
            </Button>
            <Button
              disabled={!address}
              variant="destructive"
              className="w-full bg-red-700 hover:bg-red-800 text-white"
              onClick={() => emergencyWithdraw()}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Withdrawal
            </Button>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Emergency withdrawals incur a 10% penalty
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
