import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar({ link }: {link?:string}) { 
    return (
        <nav className={`bg-gray-100 dark:bg-gray-900 shadow-sm flex items-center p-1 w-full bg-gray-100 px-3 py-1 ${link?.length>0 ? "justify-between" : 'justify-start'}`}>
            <p className="text-[1.4rem] bold italic text-sm">Staketh</p>
            {link?.length > 0  ?<ConnectButton/>: null}
        </nav>
    )
}