import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModeToggle from "./modeToggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";


export default function Sidebar() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const { address } = useAccount()
    const { openConnectModal } = useConnectModal()
    const { disconnect } = useDisconnect()
    const sections = [
        "home", "profile", "chats"
    ]
    const navigate = useNavigate()

    return (
        <aside className="flex flex-col h-full w-full w-[200px]  p-2 border-r-primary/90 border-[1px] justify-between">
            <section className="flex flex-col h-full gap-2">
                {
                    sections.map((text, index) => (
                        <p key={index} className={`${currentIndex == index ? "bg-primary font-semibold" : "bg-primary/40"}
                         hover:bg-primary text-background capitalize text-sm w-[95%] text-nowrap rounded pl-3 py-[2px] transition-all transform duration-300`}
                            onClick={() => {
                                setCurrentIndex(index);
                                navigate(`/${sections[index]}`);
                            }}>{text}</p>
                    ))
                }
            </section>
            <section className={"mb-5 w-full flex flex-col gap-1"}>
                <Button className={cn("text-sm py-1 text-background")} onClick={() => {
                    if (address) disconnect()
                    else openConnectModal?.()
                }}>{address ? "Disconnect" : "Connect Wallet"}</Button>
                <ModeToggle />
            </section>
        </aside>
    )
}