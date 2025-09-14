import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { RewardsDisplay } from "../rewards-display"
import { StatsOverview } from "./components/StatsOverview"
import { StakeHero } from "./components/StakeHero"
import { QuickActions } from "./components/QuickActions"
import { QuickStats } from "./components/QuickStats"
import { StakingDialog } from "../staking-dialog"
import ClaimFaucet from "./components/faucetCaim"

export default function Page() {
    const [isStakingDialogOpen, setIsStakingDialogOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <StatsOverview />
                <div className="flex flex-col md:flex-row w-full gap-6">
                    <div className="w-full md:w-[60%] space-y-6">
                        <StakeHero onStakeClick={() => setIsStakingDialogOpen(!isStakingDialogOpen)} />
                        <div className="gap-6">
                            <RewardsDisplay />
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Your Stake Positions</CardTitle>
                                <CardDescription>
                                    Active staking positions and their status
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>No active stake positions</p>
                                    <p className="text-sm">
                                        Connect your wallet and stake tokens to see positions here
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="w-full md:w-[32%] space-y-4">
                        <QuickActions />
                        <QuickStats />
                        <ClaimFaucet />
                    </div>
                </div>
            </div>
            <StakingDialog
                open={isStakingDialogOpen}
                onOpenChange={setIsStakingDialogOpen} />
            {/* <StickyStakeBar onStakeClick={() => setIsStakingDialogOpen(true)} />*/}
        </div>
    )
}
