import { useAppStore } from "@/store/app-store";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import SearchBar from "@/components/ui-components/search-bar";
import SearchResultsInfo from "@/components/ui-components/search-results-info";
import PublicationGrid from "@/components/app-components/publication-management/publication-grid";
import { useImportStore } from "@/store/import-store";
import ImportWizard from "@/components/app-components/import/ImportWizard";
import { TbRuler } from "react-icons/tb";


function PublicationGridView() {
    const getProjects = useAppStore(state => state.fetchProjects);
    const projects = useAppStore(state => state.projects);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Filter projects based on search query
    const filteredProjects = useMemo(() => {
        if (!projects) return [];

        if (!searchQuery.trim()) {
            return projects;
        }
        setIsLoading(false)
        const query = searchQuery.toLowerCase().trim();
        return projects.filter(project =>
            project.name?.toLowerCase().includes(query)
        );
    }, [projects, searchQuery]);

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    // Loading state
    // if (!isLoading) {
    //     return (
    //         <div className="w-full h-full flex items-center justify-center min-h-[400px]">
    //             <div className="flex flex-col items-center gap-4">
    //                 <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    //                 <p className="text-sm text-gray-600 font-medium">Loading publications...</p>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="w-full h-full space-y-6">
            {/* Search Bar Component */}
            <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search publications by name..."
                className="max-w-md"
            />

            {/* Search Results Info Component */}
            <SearchResultsInfo
                searchQuery={searchQuery}
                resultCount={filteredProjects.length}
            />

            {/* Publication Grid Component */}
            <PublicationGrid
                projects={filteredProjects}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery("")}
            />
        </div>
    );
}

export default function PublicationManagement() {
    return (
        <div className="w-full h-full p-3">
            <h1 className="text-center text-xl font-medium">Publication Management</h1>
            <PublicationGridView />
            <ImportWizard />
        </div>
    );
}