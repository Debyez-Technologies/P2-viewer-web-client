import PublicationDisplayCard from "@/components/app-components/publication-management/publication-display-card";
import { Button } from "@/components/ui/button";
import { FileText, Search } from "lucide-react";
import CreatePublicationCard from "./create-publication-card";
import { useImportStore } from "@/store/import-store";
import { useAppStore } from "@/store/app-store";
import ConfirmationModal from "@/components/ui-components/ConfirmationModal";
import { useNavigate } from "react-router";
import { PublicationMeta } from "@/types/publication";

export interface Project {
    PublicationID: string;
    PublicationName: string;
    CompanyDetails: string;
    IsConfigured: boolean;
    IsEmbedded: boolean;
    CompanyLogoMimeType?: string;
    ProductImageMimeType?: string;
}

interface PublicationGridProps {
    projects: PublicationMeta[];
    searchQuery?: string;
    onClearSearch?: () => void;
}

export default function PublicationGrid({
    projects,
    searchQuery = "",
    onClearSearch,
}: PublicationGridProps) {
    const startImport = useImportStore((state) => state.startImport);
    const {
        openDeleteConfirmation,
        closeDeleteConfirmation,
        confirmDeleteProject,
        isDeleteModalOpen,
        projectToDelete,
        setCurrentProject,
    } = useAppStore();
    const navigate = useNavigate();

    const OpenCurrentProject = (selectedPublication: PublicationMeta) => {
        setCurrentProject(selectedPublication);
        navigate(`/manage/${selectedPublication.id}`);
    };

    const startEditConfiguration = useImportStore(
        (state) => state.startEditConfiguration,
    );

    const handleConfiguration = async (data: PublicationMeta) => {
        try {
            await startEditConfiguration(data);
        } catch (error) {
            console.log(error);
        }
    };

    // 🔹 Case 1: No projects AND no search → centered create card
    if (!projects || (projects.length === 0 && !searchQuery)) {
        return (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-48 h-64 md:w-72 md:h-72 scale-105">
                    <CreatePublicationCard onClick={startImport} />
                </div>
                <div className="text-center mt-4 text-gray-600 text-sm">
                    Start by creating your first publication
                </div>
            </div>
        );
    }

    if (projects.length === 0 && searchQuery) {
        return (
            <div className="w-full h-full flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4 max-w-md text-center">
                    <div className="p-4 bg-gray-100 rounded-full">
                        <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                            No Results Found
                        </h3>
                        <p className="text-sm text-gray-600">
                            We couldn't find any publications matching{" "}
                            <span className="font-medium">
                                "{searchQuery}"
                            </span>
                            . Try adjusting your search terms.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={onClearSearch}
                        className="gap-2 mt-2"
                    >
                        Clear Search
                    </Button>
                </div>
            </div>
        );
    }

    // if (!projects || projects.length === 0) {
    //     return (
    //         <div className="w-full h-full flex items-center justify-center min-h-[400px]">
    //             <div className="flex flex-col items-center gap-4 max-w-md text-center">
    //                 <div className="p-4 bg-gray-100 rounded-full">
    //                     {searchQuery ? (
    //                         <Search className="w-12 h-12 text-gray-400" />
    //                     ) : (
    //                         <FileText className="w-12 h-12 text-gray-400" />
    //                     )}
    //                 </div>
    //                 <div className="space-y-2">
    //                     <h3 className="text-lg font-semibold text-gray-900">
    //                         {searchQuery
    //                             ? "No Results Found"
    //                             : "No Publications Yet"}
    //                     </h3>
    //                     <p className="text-sm text-gray-600">
    //                         {searchQuery ? (
    //                             <>
    //                                 We couldn't find any publications matching "
    //                                 <span className="font-medium">
    //                                     {searchQuery}
    //                                 </span>
    //                                 ". Try adjusting your search terms.
    //                             </>
    //                         ) : (
    //                             "Get started by creating your first publication to showcase your products."
    //                         )}
    //                     </p>
    //                 </div>
    //                 <Button
    //                     variant={searchQuery ? "outline" : "default"}
    //                     onClick={searchQuery ? onClearSearch : startImport}
    //                     className={`gap-2 mt-2 ${!searchQuery ? "bg-blue-600 hover:bg-blue-700" : ""}`}
    //                 >
    //                     {searchQuery ? "Clear Search" : "Create Publication"}
    //                 </Button>
    //             </div>
    //         </div>
    //     );
    // }

    // Grid with publications

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 auto-rows-fr">
            <CreatePublicationCard onClick={startImport} />
            {projects.map((project) => {
                return (
                    <PublicationDisplayCard
                        key={project.id}
                        publicationMetaData={project}
                        handleProjectDelete={openDeleteConfirmation}
                        OpenPublicationSettings={OpenCurrentProject}
                        handleProjectConfiguration={handleConfiguration}
                    />
                );
            })}

            {isDeleteModalOpen ? (
                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    title={"Delete Publication"}
                    message={`Are you sure you want to delete ${projectToDelete.name}`}
                    onConfirm={confirmDeleteProject}
                    onCancel={closeDeleteConfirmation}
                />
            ) : null}
        </div>
    );
}
