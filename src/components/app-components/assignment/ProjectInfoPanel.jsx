import { VscOrganization } from "react-icons/vsc";
import { MdImage } from "react-icons/md";
import { API_BASE_URL } from "@/config/settings";


const ProjectInfoPanel = ({ project }) => {

    return <div className="h-full bg-white border-r border-gray-200 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
            <p className="text-sm text-gray-500">Overview and information</p>
        </div>

        {/* Project Image */}
        <div className="mb-6">
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {project && project.id ? (
                    <img
                        src={`${API_BASE_URL}/api/v1/projects/${project.id}/product-image`}
                        alt={project.id}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                ) : (
                    <MdImage className="text-gray-400 text-5xl" />
                )}
            </div>
        </div>

        <div className="mb-6">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {project?.PublicationName || "Untitled Project"}
            </h3>
            <div className="flex items-start gap-3">
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {project && project.id ? (
                        <img
                            src={`${API_BASE_URL}/api/v1/projects/${project.id}/logo`}
                            alt="Company Logo"
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target.style.display = "none")}
                        />
                    ) : null}
                    <VscOrganization className="text-gray-400 text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        {project?.companyDetails || "No company details available"}
                    </p>
                </div>
            </div>
        </div>

        {/* Additional Info Section (Optional) */}
        <div className="pt-6 border-t border-gray-200">
            <div className="space-y-4">
                {project?.status && (
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                            Status
                        </label>
                        <p className="text-sm text-gray-900">{project?.status}</p>
                    </div>
                )}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                        Created
                    </label>
                    <p className="text-sm text-gray-900">
                        {new Date(project?.CreatedAt).toLocaleDateString()}
                    </p>
                </div>

            </div>
        </div>
    </div>
}

export default ProjectInfoPanel;