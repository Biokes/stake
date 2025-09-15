import { Toaster } from "@/components/ui/sonner";
import Navbar from "../components/commons/navbar";
import { useProtocol } from "@/hooks/useProtocol";


export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pro = useProtocol()
    console.log("Protocol: ", pro)
    return (
        <div className='w-full h-full'>
            <Navbar />
            {children}
            <Toaster />
        </div>
    )
}