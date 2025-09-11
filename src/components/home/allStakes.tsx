import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart3, Users, TrendingUp } from 'lucide-react'
import { useFetchStakes } from '../hooks/useFetchStakes'
import { formatNumber, formatTimestamp } from '@/lib/utils'
import { formatEther } from 'ethers'
import { useGetTotalRewards } from '../hooks/useGetTotalRewards'
import type { StakeLog } from '@/lib/types'
export default function AllStakes() {
  const { usersInfo } = useFetchStakes()
  const {totalRewards} = useGetTotalRewards()
  const uniqueUsers = Object.values(
    usersInfo.reduce((acc, log) => {
      acc[log.address] = log;
      return acc;
    }, {} as Record<string, StakeLog>)
  );
  const totalStaked = uniqueUsers.reduce((sum: bigint, log) => sum + log.newTotalStaked, 0n)
  const totalStakers = uniqueUsers.length
  const totalStakeOutput = BigInt(totalStaked) > 0n ? formatNumber(Number(formatEther(totalStaked))) : "0"
 
  return (
    <Card className="bg-gradient-secondary border-border shadow-card">
      <CardHeader className="py-2 rounded bg-gray-100 shadow mx-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center shadow-glow-primary">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div >
              <CardTitle className="text-sm md:text-xl">All Stake History</CardTitle>
              <CardDescription className={"text-[0.75rem] sm:text-[0.85rem] md:text-[1rem]"}>
                View all active staking positions across the protocol
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-success/10 text-success border-success/20 shadow-lg">
            {formatNumber(totalStakers)} Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 ">
        <div className="grid grid-cols-3 gap-4 py-4 px-2 rounded-lg bg-gradient-accent border border-border/50 shadow-md bg-gray-50">
          <div className="text-center justify-center bg-gray-100 border rounded p-1">
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 pt-6 md:pt-0">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-[0.75rem] md:text-sm font-semibold text-muted-foreground">Stakers</span>
            </div>
            <p className="text-[0.75rem] md:text-[1rem] font-semibold text-success" >{formatNumber(Number(totalStakers))}</p>
          </div>
          <div className="text-center  bg-gray-100 border rounded p-1">
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 pt-2 md:pt-0">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-[0.75rem] md:text-sm font-semibold text-muted-foreground">Total Amount Staked</span>
            </div>
            <p className="text-[0.75rem] md:text-[1rem] font-semibold text-success">{totalStakeOutput.split(".")[0] } RSK</p>
          </div>
          <div className="text-center  bg-gray-100 border rounded p-1">
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 pt-2 md:pt-0">
              <BarChart3 className="w-4 h-4 text-success" />
              <span className="text-[0.75rem] md:text-sm font-semibold text-muted-foreground">Total Rewards</span>
            </div>
            <p className="text-[0.75rem] md:text-[1rem] font-semibold text-success"> {totalRewards} RSK</p>
          </div>
        </div>

        <div className={`rounded-lg border border-border/50 overflow-hidden ${usersInfo.length > 0 ? "max-h-[200px] overflow-auto" : ""}`}>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/10 hover:bg-muted/10 border-border/50">
                <TableHead className="text-muted-foreground font-medium">Address</TableHead>
                <TableHead className="text-muted-foreground font-medium">Staked</TableHead>
                <TableHead className="text-muted-foreground font-medium">APR</TableHead>
                <TableHead className="text-muted-foreground font-medium">last Staked Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {usersInfo.map((user, index) => (
                <TableRow key={index} className="border-border/30 hover:bg-muted/5 transition-smooth">
                  <TableCell className="font-mono text-sm">
                    {user.address.substring(0, 7)}..
                  </TableCell>
                  <TableCell className="font-semibold">
                    { formatNumber(Number(formatEther(user.amount))) + " "}
                    RSK
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.currentRewardRate}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success/10 text-success border-success/20 text-xs">
                      {formatTimestamp(user.timestamp)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {uniqueUsers.length === 0 && (
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