import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const sections = [
        "home", "profile",
    ]
    const navigate = useNavigate()
    return (
        <aside className="flex flex-col h-full w-full w-[200px]  p-2 border-r-primary/90 border-[1px] justify-between">
            <section  className="flex flex-col h-full gap-2">
                {
                    sections.map((text, index) => (
                        <p key={index} className={`${currentIndex == index ? "bg-primary font-semibold" : "bg-primary/70"}
                         hover:bg-primary text-background capitalize text-sm w-[95%] text-nowrap rounded pl-3 py-[2px] transition-all transform duration-300`}
                            onClick={() => {
                                navigate(`/${sections[currentIndex]}`)
                                setCurrentIndex(index);
                            }}>{text}</p>
                    ))
                }
            </section>
            <section className={"mb-5"}>
                Disconnect wallet
            </section>
        </aside>
    )
}