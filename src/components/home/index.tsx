import { useAccount } from "wagmi"
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import StakeModal from "./stakeModal";
import StakingPosition from "./stakingPosition";
import AllStakes from "./allStakes";

export default function Home() {
    const { isConnected } = useAccount();
    const [isOpen, setOpen] = useState<boolean>(false)
    function toggle() {
        setOpen(!isOpen);
    }
    return (
        <div className="w-full">
            <div className="w-full text-center py-2 px-3 md:px-5">
                <article className="py-10 flex border-1 border-gray-50 rounded flex-col justify-between items-center text-cnter w-full gap-2 shadow bg-gray-50">
                    <h5 className="text-4xl">
                        Stake and Earn your rewards
                    </h5>
                    <span className="text-primary text-[1rem] max-w-[500px]">
                        Join thousands of stakers earning competitive rewards on Ethereum. Simple, secure, and transparent DeFi staking.
                    </span>
                    <Button className={'my-2 hover:scale-[1.05]'} onClick={() => {
                        if (!isConnected) {
                            toast.error("Kindly Connect your Wallet to Stake");
                            return;
                        }
                        toggle()
                    }}>Stake Now</Button>
                </article>
                {isOpen &&
                    <StakeModal setOpen={() => toggle()} />}
            </div>
            <section className="flex flex-col sm:flex-row gap-2 px-3">
                <div className="bg-card/50 p-2 w-full sm:w-[50%]">
                    <StakingPosition />
                </div>
                <section className="mb-5">
                    <div className="bg-card/50 ">
                        <AllStakes />
                    </div>
                </section>
            </section>

        </div >
    )
}