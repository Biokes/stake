import { useState, type Dispatch, type SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, AlertTriangle } from "lucide-react"
import { useStaking } from "./hooks/use-staking"
import { Alert, AlertDescription } from "./ui/alert"
import { toast } from "sonner"
import { useBalance } from "./hooks/useBalance"

interface StakingDialogProps {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

export function StakingDialog({ open, onOpenChange }: StakingDialogProps) {
  const [amount, setAmount] = useState("")
  const [isApproved, setIsApproved] = useState(false)
  const [showApprovalAlert, setShowApprovalAlert] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isStaking, setIsStaking] = useState(false)

  const { tokenBalance } = useBalance()
  const { stake, approve } = useStaking()
  const balance = tokenBalance

  const isValidAmount =
    amount && Number.parseFloat(amount) > 0 && Number.parseFloat(amount) <= balance

  const handleApproveConfirm = async () => {
    setIsApproving(true)
    try {
      await approve(amount)
      toast.success("Approval Successful")
      setIsApproved(true)
      setShowApprovalAlert(false)
    } catch (error) {
      toast.error("Approval Failed")
      console.error("Approval failed error: ", error)
    } finally {
      setIsApproving(false)
    }
  }

  const handleStake = async () => {
    if (!isValidAmount || !isApproved) return

    setIsStaking(true)
    try {
      await stake(amount)
      setAmount("")
      setIsApproved(false)
      onOpenChange(false)
    } finally {
      setIsStaking(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setAmount("")
    setIsApproved(false)
    setShowApprovalAlert(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Coins className="mr-2 h-4 w-4" />
          Stake Now
        </Button>
      </DialogTrigger>
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
            <p className="text-sm text-muted-foreground">Available: {balance} RSK</p>
          </div>

          {showApprovalAlert && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Are you sure you want to approve this app to deduct your stake from your
                balance?
              </AlertDescription>
              <div className="flex gap-2 mt-2 w-full pl-[30px]">
                <Button onClick={handleApproveConfirm} disabled={isApproving}>
                  {isApproving ? "Approving..." : "Confirm"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowApprovalAlert(false)}
                  disabled={isApproving}
                >
                  Cancel
                </Button>
              </div>
            </Alert>
          )}

          <div className="flex flex-col space-y-2">
            {isValidAmount && !isApproved && !showApprovalAlert && (
              <Button
                onClick={() => setShowApprovalAlert(true)}
                disabled={isApproving}
                className="w-full"
              >
                Approve
              </Button>
            )}

            {isApproved && (
              <Button onClick={handleStake} disabled={isStaking} className="w-full">
                <Coins className="mr-2 h-4 w-4" />
                {isStaking ? "Staking..." : "Stake Tokens"}
              </Button>
            )}
            <p className="text-xs w-full text-center text-red-400">After approval Always stake</p>
            <Button variant="outline" onClick={handleClose} className={`${isApproved?"hidden":""} w-full bg-transparent`}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
