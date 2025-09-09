import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart3, Users, TrendingUp } from 'lucide-react'
import { useFetchStakes } from '../hooks/useFetchStakes'

export default function AllStakes() {
  const { usersInfo } = useFetchStakes()
  const totalStakers = usersInfo.length
  const totalStaked = usersInfo.reduce((sum, user) => sum + Number(user.info.stakedAmount), 0)
  const totalRewards = usersInfo.reduce((sum, user) => sum + Number(user.info.pendingRewards), 0)

  function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp * 1000n));
  if (isNaN(date.getTime())) return "Invalid date";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
  return (
    <Card className="bg-gradient-secondary border-border shadow-card">
      <CardHeader className="py-2 rounded bg-gray-100 shadow mx-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center shadow-glow-primary">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div >
              <CardTitle className="text-xl">All Stake Positions</CardTitle>
              <CardDescription>
                View all active staking positions across the protocol
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-success/10 text-success border-success/20 shadow-lg">
            {totalStakers} Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 ">
        <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-gradient-accent border border-border/50 shadow-md bg-gray-50">
          <div className="text-center border rounded">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Stakers</span>
            </div>
            <p className="text-lg font-bold text-foreground">{totalStakers}</p>
          </div>
          <div className="text-center  bg-gray-100 border rounded">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Amount Staked</span>
            </div>
            <p className="text-lg font-bold text-foreground">{totalStaked} RSK</p>
          </div>
          <div className="text-center  bg-gray-100 border rounded">
            <div className="flex items-center justify-center gap-1 mb-1">
              <BarChart3 className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-muted-foreground">Total Outgoing Rewards</span>
            </div>
            <p className="text-lg font-bold text-success">{totalRewards} RSK</p>
          </div>
        </div>

        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/10 hover:bg-muted/10 border-border/50">
                <TableHead className="text-muted-foreground font-medium">Address</TableHead>
                <TableHead className="text-muted-foreground font-medium">Staked</TableHead>
                <TableHead className="text-muted-foreground font-medium">Rewards</TableHead>
                <TableHead className="text-muted-foreground font-medium">Clained Rewards</TableHead>
                <TableHead className="text-muted-foreground font-medium">last staking</TableHead>
                {/* <TableHead className="text-muted-foreground font-medium">Action</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersInfo.map((user, index) => (
                <TableRow key={index} className="border-border/30 hover:bg-muted/5 transition-smooth">
                  <TableCell className="font-mono text-sm">
                    {user.address}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {user.info.stakedAmount} RSK
                  </TableCell>
                  <TableCell className="text-success font-semibold">
                    {user.info.pendingRewards} RSK
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.info.rewardDebt}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success/10 text-success border-success/20 text-xs">
                      {formatTimestamp(user.info.lastStakeTimestamp)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {usersInfo.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium mb-2">No Stakes Yet</p>
            <p className="text-sm text-muted-foreground">
              Be the first to stake and earn rewards
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}