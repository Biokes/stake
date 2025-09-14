import { useState, type Dispatch, type SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "./ui/alert"
import { useStakingContext } from "@/hooks/useStakingContext"
import { formatEther } from "viem"

interface StakingDialogProps {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

export function StakingDialog({ open, onOpenChange }: StakingDialogProps) {
  const [amount, setAmount] = useState("")
  const [showApprovalAlert, setShowApprovalAlert] = useState(false)
  const { tokenBalance, approve, stake, isApproving, isStaking } = useStakingContext()

  const balance = Number(formatEther(tokenBalance))
  const isValidAmount = amount && Number(amount) > 0 && Number(amount) <= balance

  const approvePop = async () => {
    if (!isValidAmount) return
    try {
      await approve(Number(amount))
      setAmount("")
      onOpenChange(false)
    } catch (error) {
      console.error("Staking failed:", error)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setAmount("")
    setShowApprovalAlert(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <Button className="w-full">
          <Coins className="mr-2 h-4 w-4" />
          Stake Now
        </Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Coins className="h-5 w-5" />
            <span>Stake Tokens</span>
          </DialogTitle>
          <DialogDescription>Enter the amount you want to stake</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stake-amount">Stake Amount</Label>
            <Input
              id="stake-amount"
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              placeholder="Enter amount to stake"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.value
                if (/^\d*\.?\d*$/.test(val)) {
                  setAmount(val)
                }
              }}
            />
            <p className="text-sm text-muted-foreground">Available: {balance.toFixed(4)} RFK</p>
          </div>

          {showApprovalAlert && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className={"text-[0.75rem]"}>
                You're about to stake {amount} RFK tokens. This will require an approval
                transaction followed by the stake transaction. Do you want to proceed?
              </AlertDescription>
              <div className="flex gap-2 mt-2 w-full pl-[30px]">
                <Button onClick={approvePop} disabled={isApproving || isStaking}>
                  {isApproving ? "Approving..." : isStaking ? "Staking..." : "Confirm"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>{ setShowApprovalAlert(false)}}
                  disabled={isApproving || isStaking}
                >
                  Cancel
                </Button>
              </div>
            </Alert>
          )}

          <div className="flex flex-col space-y-2">
            {isValidAmount && !showApprovalAlert && (
              <Button
                onClick={() => {
                  setShowApprovalAlert(true)
                  stake(Number(amount))
                }}
                disabled={isApproving || isStaking}
                className="w-full"
              >
                Stake Now
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={handleClose} 
              className="w-full bg-transparent"
              disabled={isApproving || isStaking}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
