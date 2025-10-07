import Sidebar from "@/components/commons/sidebar";
import Navbar from "../components/commons/navbar";
import { Outlet } from "react-router-dom";


export default function AppLayout() {

    return (
        <div className='w-full h-screen flex flex-col overflow-hidden'>
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-shrink-0 overflow-y-auto w-[150px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

    
