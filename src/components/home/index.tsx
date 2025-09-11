import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Users, Layers, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useProtocolStats } from "../hooks/use-protocol-stats";
import { RewardsDisplay } from "../rewards-display";
import { StakingDialog } from "../staking-dialog";
// import { StakingForm } from "../staking-form";
import { useAccount } from "wagmi";
import { useFetchStakes } from "../hooks/useFetchStakes";
import type { StakeLog } from "@/lib/types";
import { toast } from "sonner";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";
import { formatTimeRemaining, checkClaimable } from "@/lib/utils";
import { formatEther } from "viem";
import { useStaking } from "../hooks/use-staking";

export default function Page() {
    const [isStakingDialogOpen, setIsStakingDialogOpen] = useState(false)
    const { isConnected } = useAccount()
    const { totalStaked, rewardRate, totalReward } = useProtocolStats()
    const { usersInfo } = useFetchStakes()
      const uniqueUsers = Object.values(
        usersInfo.reduce((acc, log) => {
          acc[log.address] = log;
          return acc;
        }, {} as Record<string, StakeLog>)
      );
    const totalStakers = uniqueUsers.length
    const { userDetails } = useFetchUserInfo()
    const {     withdraw, emergencyWithdraw,claimRewards  } = useStaking()
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium text-muted-foreground">Total Reward</span>
                            </div>
                            <p className="text-md font-bold text-foreground mt-2">{totalReward} RFK</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium text-muted-foreground">{rewardRate} APR</span>
                            </div>
                            <p className="text-2xl font-bold text-foreground mt-2">10%</p>
                            {/* <p className="text-sm text-muted-foreground">No active stakes</p> */}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="px-4 py-4">
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium text-muted-foreground">Active Stakers</span>
                            </div>
                            <p className="text-2xl font-bold text-foreground mt-2">{totalStakers}</p>
                            <p className="text-sm text-muted-foreground">{isConnected ? "Total number of available stakers" : "Protocol not connected"}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="px-4 py-6">
                            <div className="flex items-center space-x-2">
                                <Layers className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium text-muted-foreground">Total Stakes</span>
                            </div>
                            <p className="text-md font-bold text-foreground mt-2">{totalStaked} RFK</p>
                            <p className="text-sm text-muted-foreground">No positions</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-6">
                    <div className="w-full md:w-[60%] space-y-6">
                        <Card className="border border-border shadow-lg bg-gradient-to-br from-card to-muted/20">
                            <CardContent className="py-10 px-6 text-center">
                                <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Stake and Earn Your Rewards</h2>
                                <p className="text-primary text-sm md:text-base max-w-[500px] mx-auto mb-6">
                                    Join thousands of stakers earning competitive rewards on RFKereum. Simple, secure, and transparent
                                    DeFi staking.
                                </p>
                                <Button
                                    size="lg"
                                    className="hover:scale-105 transition-transform"
                                    onClick={() =>isConnected? setIsStakingDialogOpen(true): toast.info("Connect wallet to stake first")}
                                >
                                    Stake Now
                                </Button>
                            </CardContent>
                        </Card>

                        <div className=" gap-6">
                            {/* <StakingForm />
                            pasp */}
                            <RewardsDisplay />
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Your Stake Positions</CardTitle>
                                <CardDescription>Active staking positions and their status</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>No active stake positions</p>
                                    <p className="text-sm">Connect your wallet and stake tokens to see positions here</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="w-full md:w-[32%] space-y-4">
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
                                                    <p className="text-xs text-foreground font-medium">Your Current Claimable Reward</p>
                                                    <p className="text-sm font-bold text-foreground mt-1">{formatEther(BigInt(userDetails.pendingRewards)).substring(0,7)} RFK</p>
                                                </div>
                                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white"
                                                    disabled={checkClaimable(userDetails.pendingRewards)} onClick={claimRewards}>
                                                    Claim Rewards
                                                </Button>
                                            </div>
                                        </Card>
                                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white" onClick={() => {
                                            withdraw(BigInt(userDetails.pendingRewards))
                                        }} disabled={!userDetails.canWithdraw}>
                                            Withdraw Staking
                                        </Button>

                                        <Button variant="destructive" className="w-full bg-red-700 hover:bg-red-800 text-white">
                                            <AlertTriangle className="h-4 w-4 mr-2" onClick={() => {  
                                                emergencyWithdraw()
                                            }} />
                                            Emergency Withdrawal
                                        </Button>
                                    </div>

                                    <div className="pt-4 border-t border-border">
                                        <p className="text-xs text-muted-foreground">Emergency withdrawals incur a 10% penalty</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <h4 className="font-medium text-foreground mb-3">Quick Stats</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Total Staked:</span>
                                        <span className="font-medium text-foreground">{formatEther(BigInt(userDetails.stakedAmount)).substring(0,7)} RFK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Pending Rewards:</span>
                                        <span className="font-medium text-primary">{formatEther(BigInt(userDetails.pendingRewards)).substring(0,7)} RFK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Next Unlock:</span>
                                        <span className="font-medium text-foreground">{formatTimeRemaining(userDetails.timeUntilUnlock)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <StakingDialog open={isStakingDialogOpen} onOpenChange={setIsStakingDialogOpen} />
        </div>
    )
}
