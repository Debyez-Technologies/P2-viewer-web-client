import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { useNavigate } from "react-router";

export default function RestrictedPage() {
    const navigate = useNavigate()
    return <div className="flex w-full h-screen justify-center items-center flex-col">
        <h1 className="text-4xl">Opps!! Seems like you're in the wrong page</h1>
        <h2 className="text-2xl">Click here to go back home</h2>
        <Button variant="ghost" size="icon" className="w-24 h-24" onClick={() => navigate("/")}>
            <House className="text-viewer-core" size={48}/>
        </Button>
    </div>
}