import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import { usePublicationStore } from "@/store/publication-store";
import { PublicationMeta } from "@/types/publication";
import {
    AlertCircle,
    CheckCircle2,
    Edit,
    Factory,
    ImageIcon,
    Settings2Icon,
    Trash,
} from "lucide-react";
import { useEffect, useState } from "react";

interface PublicationDisplayCardProps {
    publicationMetaData: PublicationMeta;
    handleProjectDelete: (project: PublicationMeta) => void;
    handleProjectConfiguration: (publication: PublicationMeta) => void;
    OpenPublicationSettings: (selectedPublication: PublicationMeta) => void;
}

export default function PublicationDisplayCard({
    publicationMetaData,
    handleProjectDelete,
    OpenPublicationSettings,
    handleProjectConfiguration,
}: PublicationDisplayCardProps) {

    const { getSignedUrlForProductImage } = usePublicationStore();
    const [url, setUrl] = useState<string | null>(null);

    const { currentUser } = useAuthStore();

    const userId = currentUser?.id;
    const publicationId = publicationMetaData.id;

    useEffect(() => {
        if (!publicationId || !userId) return;

        let isMounted = true; // prevents state update after unmount
        
        const fetchSignedUrl = async () => {
            console.log("fetching signed urls", userId, publicationId)

            try {
                const signedUrl = await getSignedUrlForProductImage(
                    publicationId,
                    userId,
                );

                if (isMounted) {
                    setUrl(signedUrl ?? null);
                }
            } catch (err) {
                console.error("Failed to fetch signed url", err);
            }
        };
        
        fetchSignedUrl();

        return () => {
            isMounted = false;
        };
    }, [publicationId, userId]);

    console.log(publicationMetaData, "Project grid");
    console.log("fetching signed urls", userId, publicationMetaData.id)
    
    if (!url) return <p>Loading image...</p>;
    
    return (
        <Card className=" h-full flex flex-col overflow-hidden border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
            {/* Product Image Header */}
            <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                {url ? (
                    <>
                        <img
                            src={url}
                            alt={publicationMetaData.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="p-4 bg-white rounded-full shadow-sm">
                            <ImageIcon className="h-10 w-10 text-gray-400" />
                        </div>
                        {/* <span className="text-sm text-gray-500 font-medium">No Image</span> */}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-0">
                <CardContent className="space-y-4 flex-1 px-5 pb-5">
                    {/* Product Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Product
                        </label>
                        <p className="text-base font-semibold text-gray-900 leading-snug">
                            {publicationMetaData.name}
                        </p>
                    </div>

                    {/* Manufacturer Info */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Manufacturer
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                                    <Factory className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 truncate">
                                {publicationMetaData.companyDetails || (
                                    <span className="text-gray-400 italic">
                                        Not specified
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </div>

            {/* Status Footer */}
            <CardFooter className="pt-4 pb-4 px-5 border-t-2 border-gray-50 bg-gradient-to-b from-gray-50/50 to-white">
                {publicationMetaData.isConfigured ? (
                    <div className="w-full flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <div className="p-1 bg-green-50 rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-green-700">
                                    Configured
                                </span>
                            </div>
                        </div>

                        <div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-medium transition-all"
                                onClick={() =>
                                    OpenPublicationSettings(publicationMetaData)
                                }
                            >
                                <Settings2Icon className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="border-2 border-gray-200 hover:border-gray-300 hover:bg-red-200 font-medium transition-all"
                                onClick={() =>
                                    handleProjectDelete(publicationMetaData)
                                }
                            >
                                <Trash />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <div className="p-1 bg-amber-50 rounded-full">
                                <AlertCircle className="w-4 h-4 text-amber-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-amber-700">
                                    Pending Setup
                                </span>
                            </div>
                        </div>
                        <div>
                            <Button
                                variant="outline"
                                size="sm"
                                className=" text-black font-medium shadow-sm hover:shadow transition-all"
                                onClick={() =>
                                    handleProjectConfiguration(
                                        publicationMetaData,
                                    )
                                }
                            >
                                <Edit />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="gap-2 border-2 border-gray-200 hover:border-gray-300 hover:bg-red-200 font-medium transition-all"
                                onClick={() =>
                                    handleProjectDelete(publicationMetaData)
                                }
                            >
                                <Trash />
                            </Button>
                        </div>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
