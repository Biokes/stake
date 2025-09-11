// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog"
// import { Button } from "../ui/button"
// import { Label } from "@radix-ui/react-label"
// import { Input } from "../ui/input"
// import React, { useEffect, useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
// import { Coins, TrendingUp } from "lucide-react"
// import { useAccount } from "wagmi"
// import { useBalance } from "../hooks/useBalance"
// import { useApproveAndStakeToken } from "../hooks/useApproval"
// import { formatEther } from "viem"


// export default function StakeModal({ setOpen }: { setOpen: () => void }) {
//     const [stakeValue, setStakeValue] = useState<number>(0);
//     const { isConnected } = useAccount();
//     const { tokenBalance } = useBalance();
//     const { execute, loading } = useApproveAndStakeToken(stakeValue);
//     const [isValidStake, setValidStake] = useState(false)
//     useEffect(() => {
//         setValidStake(BigInt(formatEther(BigInt(tokenBalance)).split(".")[0]) < BigInt(stakeValue))
//      },[stakeValue, tokenBalance])
//     return (
//         <Dialog open onOpenChange={setOpen}>
//             <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden" aria-description="Stake dialog">
//                 <DialogHeader className="relative">
//                     <DialogTitle className="sr-only">Stake RSK</DialogTitle>
//                     <DialogClose className="absolute right-3 top-3 hover:bg-muted" />
//                 </DialogHeader>
//                 <Card className="bg-gradient-secondary border-border shadow-card border-none rounded-none">
//                     <CardHeader className="pb-4 w-full px-3">
//                         <div className="flex items-center gap-3 w-full">
//                             <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary bg-gray-400">
//                                 <Coins className="w-5 h-5 text-primary-foreground" />
//                             </div>
//                             <div>
//                                 <CardTitle className="text-xl w-full flex justify-between items-center p-1 gap-10">
//                                         <h4>Stake RSK</h4>
//                                         <p className="p-1 text-[0.8rem] border shadow-md bg-gray-700 rounded text-white">Bal: { formatEther(BigInt(tokenBalance)).split(".")[0]} RSK</p>
//                                 </CardTitle>
//                                 <CardDescription className="text-xs">
//                                     Stake your RSK tokens and earn rewards
//                                 </CardDescription>

//                             </div>
//                         </div>
//                     </CardHeader>
//                     <CardContent className="space-y-6">
//                         <div className="space-y-2">
//                             <Label htmlFor="amount" className="text-sm font-medium">
//                                 Amount (RSK)
//                             </Label>
//                             <div className="relative">
//                                 <Input id="amount" inputMode="numeric" type="text" placeholder="0.0"
//                                     value={stakeValue}
//                                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                                         setStakeValue(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))
//                                     }
//                                     className="pr-12 bg-card border-border text-lg font-mono"
//                                     min="0"
//                                 />
//                                 <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
//                                     RSK
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="p-4 rounded-lg bg-gradient-accent border border-border/50 ">
//                             <div className="flex items-center gap-2 mb-2">
//                                 <TrendingUp className="w-4 h-4 text-primary" />
//                                 <span className="text-sm font-medium">Staking Benefits</span>
//                             </div>
//                             <ul className="text-xs text-muted-foreground space-y-1">
//                                 <li>• Earn up to 10% APR on your stake</li>
//                                 <li>• Rewards are compounded automatically</li>
//                                 <li>• Withdraw anytime with 7-day cooldown</li>
//                                 <li className="text-red-400">• Emergency Withdrawal penalty of 10% on stakes</li>
//                             </ul>
//                         </div>

//                         <Button
//                             onClick={execute}
//                             disabled={!isConnected || stakeValue == 0 || loading || isValidStake}
//                             className="w-full hover:text-white hover:shadow-gray-300 text-gray-200 font-semibold py-3 transition-smooth"
//                         >
//                             {!loading ? "Stake" : "Please wait...."}
//                         </Button>

//                         {!isConnected && (
//                             <p className="text-center text-sm text-muted-foreground">
//                                 Connect your wallet to start staking
//                             </p>
//                         )}
//                     </CardContent>
//                 </Card>
//             </DialogContent>
//         </Dialog>
//     )
// }
