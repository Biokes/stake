// import { Button } from "@/components/ui/button"
// import { useAccount } from "wagmi"
// import { toast } from "sonner"

// interface StickyStakeBarProps {
//   onStakeClick: () => void
// }

// export function StickyStakeBar({ onStakeClick }: StickyStakeBarProps) {
//   const { isConnected } = useAccount()

//   const handleStakeClick = () => {
//     if (!isConnected) {
//       toast.info("Connect wallet to stake first")
//       return
//     }
//     onStakeClick()
//   }

//   return (
//     <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border z-50">
//       <div className="container mx-auto flex justify-center">
//         <Button
//           size="lg"
//           className="w-full max-w-[400px] hover:scale-105 transition-transform bg-primary text-white shadow-lg"
//           onClick={handleStakeClick}
//         >
//           Stake Now
//         </Button>
//       </div>
//     </div>
//   )
// }
