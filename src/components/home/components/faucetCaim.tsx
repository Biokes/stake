import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HandCoins } from 'lucide-react';
import { toast } from "sonner";
import { useAccount } from "wagmi";

export default function ClaimFaucet() {
    const { isConnected } = useAccount()
    function claimFaucet() { 
        if (!isConnected) toast.error("Connect wallwt to be able to claim");
    }
    return (
        <Card>
            <CardContent className="p-4 flex justify-center flex-col">
                <div className="flex items-center space-x-2">
                    <HandCoins color="#0BB0C2"/>
                    <span className="text-sm font-medium text-muted-foreground">Faucets</span>
                </div>
                <p className="text-md font-bold text-foreground mt-2">Claim faucets here</p>
                <Button className="mt-3" onClick={claimFaucet}>
                    click to claim
                </Button>
            </CardContent>
        </Card>
    )
}