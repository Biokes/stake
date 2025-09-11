import { Toaster } from "@/components/ui/sonner";
import Navbar from "../components/commons/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full h-full'>
            <Navbar />
            {children}
            <Toaster />
        </div>
    )
}