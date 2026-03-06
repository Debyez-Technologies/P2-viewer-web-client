import { useNavigate } from "react-router";
import ProjectPreview from "./ProjectPreview";


const AppSidebar = ({ project }) => {
    const navigate = useNavigate();
    const navigateToSettings = () => {
        navigate("/dashboard/settings")
    }
       return (
        // The sidebar is a flex column that fills its parent's height
        <div className="flex flex-col h-full gap-6">
            {/* This container for the preview will grow to fill available space */}
            <div className="flex-grow">
                <ProjectPreview project={project} />
            </div>
        </div>
    );
};

export default AppSidebar;