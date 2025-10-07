import { useState} from "react";
export default function Sidebar() { 
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const sections = [
         "home","profile",
    ]
    return (
        <aside className="flex flex-col flex-grow w-full w-[1500px] gap-2 p-2">
            {  
                sections.map((text, index) => (
                    <p key={index} className={`${currentIndex == index ? "bg-primary font-semibold" : "bg-primary/70"}
                         hover:bg-primary text-background capitalize text-md w-[95%] text-nowrap rounded pl-3 py-[2px]`}
                        onClick={() => { 
                            setCurrentIndex(index);
                        }}>{text}</p>
                ))
            }
        </aside>
    )
}