import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, Gift, Clock, TrendingUp } from 'lucide-react'
import { Progress } from '../ui/progress'
import { useStakingContext } from '@/hooks/useStakingContext'


export default function StakingPosition() {
    const { userDetails, claimRewards, loading } = useStakingContext();
  const { stakedAmount, pendingRewards } = userDetails;

  return (
    <Card className="bg-gradient-secondary shadow-card">
      <CardHeader className="pb-4 py-2 rounded bg-gray-100 shadow mx-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center shadow-glow-primary">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">Your Position</CardTitle>
              <CardDescription>
                Current staking position and rewards
              </CardDescription>
            </div>
          </div>
          {Number(stakedAmount) > 0 && (
            <Badge className="bg-success/10 text-success border-success/20">
              Active
            </Badge>
          )}
        </div>
      </CardHeader>
        <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Pending Rewards</span>
              <Badge variant="outline">{2}% APR</Badge>
            </div>
            <p className="text-lg font-bold text-foreground">{Number(pendingRewards) / 1e18} ETH</p>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              Next reward in {"24h"}
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Earned</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-lg font-bold text-foreground">{Number(pendingRewards) / 1e18} ETH</p>
            <p className="text-sm text-muted-foreground mt-2">Lifetime earnings from staking</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reward Progress</span>
            <span className="text-foreground">75%</span>
          </div>
          <Progress value={10} className="h-2" />
          <p className="text-xs text-muted-foreground">Next reward distribution in {0}</p>
        </div>
        <Button 
          className="w-full" 
          onClick={claimRewards}
          disabled={loading || Number(pendingRewards) === 0}
        >
          <Gift className="mr-2 h-4 w-4" />
          Claim Rewards ({Number(pendingRewards) / 1e18} RSK)
        </Button>
      </CardContent>
    </Card>
  )
}