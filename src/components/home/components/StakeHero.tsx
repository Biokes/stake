import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAccount } from "wagmi"
import { toast } from "sonner"

interface StakeHeroProps {
  onStakeClick: () => void
}

export function StakeHero({ onStakeClick }: StakeHeroProps) {
  const { isConnected } = useAccount()

  const handleStakeClick = () => {
    if (!isConnected) {
      toast.info("Connect wallet to stake first")
      return
    }
    onStakeClick()
  }

  return (
    <Card className="border border-border shadow-lg bg-gradient-to-br from-card to-muted/20">
      <CardContent className="py-10 px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
          Stake and Earn Your Rewards
        </h2>
        <p className="text-primary text-sm md:text-base max-w-[500px] mx-auto mb-6">
          Join thousands of stakers earning competitive rewards on RFKereum. Simple,
          secure, and transparent DeFi staking.
        </p>
        <Button
          size="lg"
          className="hover:scale-105 transition-transform"
          onClick={handleStakeClick}
        >
          Stake Now
        </Button>
      </CardContent>
    </Card>
  )
}
