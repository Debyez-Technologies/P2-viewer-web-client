import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface CreatePublicationCardProps {
    onClick?: () => void;
}

export default function CreatePublicationCard({
    onClick
}: CreatePublicationCardProps) {
    return (
        <Card
            onClick={onClick}
            className="group h-full flex flex-col overflow-hidden border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer"
        >
            {/* Product Image Header */}
            <div className="relative h-full flex items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-4 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                        <Plus className="h-10 w-10 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="text-sm text-gray-500 font-medium">Create New</span>
                </div>
            </div>
        </Card>
    );
}