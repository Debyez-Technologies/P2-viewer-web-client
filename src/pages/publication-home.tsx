import PublicationTile from "@/components/app-components/publication-management/publication-tile";
import IntroBox from "@/components/ui-components/intro-box";
import { useAppStore } from "@/store/app-store";
import { useAuthStore } from "@/store/auth";
import { usePublicationStore } from "@/store/publication-store";
import { BookText } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function PublicationHome() {
    const currentUser = useAuthStore((state) => state.currentUser);

    const [loading, setLoading] = useState(true);
    const fetchUserProjects = useAppStore((state) => state.fetchUserProjects);
    const assignedProjects = useAppStore((state) => state.assignedProjects);
    const setPublicationIDinPublicationStore = usePublicationStore(
        (state) => state.setPublicationIDinPublicationStore,
    );
    const setCurrentProjectInfo = useAppStore(
        (state) => state.setCurrentProjectInfo,
    );
    const navigate = useNavigate();

    const pub = JSON.parse(localStorage.getItem(`publication-${currentUser.id}`));

    const handleProjectOpen = (project) => {
        if (pub === null) {
            localStorage.setItem(`publication-${currentUser.id}`, JSON.stringify(project));
        }
        setPublicationIDinPublicationStore(project.PublicationID);
        navigate("/publications/catalog");
        setCurrentProjectInfo(project);
    };

    useEffect(() => {
        if (pub) {
            handleProjectOpen(pub);
        } else {
            setLoading(false);
        }
        fetchUserProjects(currentUser.id);
    }, []);

    if (loading) return <div></div>;

    console.log(currentUser, "Current User")
    return (
        <div className="flex flex-col p-3 w-full h-full justify-center items-center gap-10">
            <IntroBox />

            {/* Container: Changed to Flex + Wrap + Center */}
            <div className="w-full flex flex-wrap justify-center gap-6 px-10">
                <PublicationTile
                    projects={assignedProjects}
                    handleOpen={handleProjectOpen}
                />
            </div>
        </div>
    );
}
