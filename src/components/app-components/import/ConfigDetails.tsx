import React, { useState, useEffect } from "react";
import { useImportStore } from "../../../store/import-store";
import Spinner from "../../ui-components/Spinner";
import { useAppStore } from "../../../store/app-store";
import { API_BASE_URL } from "@/config/settings";
import { Button } from "@/components/ui/button";
import { SkipForward } from "lucide-react";
import FileInput from "@/components/ui-components/FileInput";

const ConfigDetails = () => {
    const publicationId = useImportStore((state) => state.publicationId);
    const companyDetails = useImportStore((state) => state.companyDetails);
    const inferredName = useImportStore((state) => state.inferredName);
    const saveProjectDetails = useImportStore(
        (state) => state.saveProjectDetails,
    );
    // const embedPublication = useAiStore((state) => state.embedPublication);
    const isLoading = useImportStore((state) => state.isLoading);
    const skipConfiguration = useImportStore(
        (state) => state.skipConfiguration,
    );
    const currentProject = useAppStore((state) => state.currentProject);

    const [formState, setFormState] = useState({
        name: "",
        companyDetails: "",
        companyLogo: null,
        productImage: null,
    });
    // Construct image URLs based on the current publicationId
    // The extra `?t=${Date.now()}` is a cache-busting trick to force image reload after an update.
    const logoUrl = `${API_BASE_URL}/api/v1/projects/${publicationId}/logo?t=${Date.now()}`;
    const productUrl = `${API_BASE_URL}/api/v1/projects/${publicationId}/product-image?t=${Date.now()}`;

    // Pre-fill the form with data from the store when the component loads
    useEffect(() => {
        setFormState((prev) => ({
            ...prev,
            name: inferredName,
            companyDetails: companyDetails,
        }));
    }, [inferredName, companyDetails]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    console.log("currentProject.IsConfigured", currentProject?.isConfigured);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveProjectDetails(formState, currentProject?.isConfigured);
        console.log("starting embedding");

        // await embedPublication(publicationId);
        // console.log("embeddign finished");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Name of Publication
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label
                    htmlFor="companyDetails"
                    className="block text-sm font-medium text-gray-700"
                >
                    Company Details
                </label>
                <textarea
                    id="companyDetails"
                    name="companyDetails"
                    value={formState.companyDetails}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* --- NEW: Image Upload and Preview Section --- */}
            <div className="grid grid-cols-2 gap-4">
                {/* <div>
                    <label
                        htmlFor="companyLogo"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Company Logo
                    </label>
                    <div className="mt-1 flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border">
                            <img
                                src={logoUrl}
                                alt="Logo"
                                className="w-full h-full object-cover"
                                onError={(e) =>
                                    (e.target.style.display = "none")
                                }
                            />
                        </div>
                        <input
                            type="file"
                            id="companyLogo"
                            name="companyLogo"
                            accept="image/*"
                            onChange={handleChange}
                            className="block w-full text-sm"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Upload a new file to replace the existing one.
                    </p>
                </div>*/}
                {/* <label
                        htmlFor="productImage"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Product Image
                    </label>
                    <div className="mt-1 flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border">
                            <img
                                src={productUrl}
                                alt="Product"
                                className="w-full h-full object-cover"
                                onError={(e) =>
                                (e.currentTarget.style.display = "none")
                                }
                                />
                        </div>
                        <input
                        type="file"
                            id="productImage"
                            name="productImage"
                            accept="image/*"
                            onChange={handleChange}
                            className="block w-full text-sm"
                            />
                            </div> */}
                {/* <div className="w-full">
                    <FileInput
                        onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Upload a new file to replace the existing one.
                    </p>
                </div> */}
            </div>
            <div className="w-full">
                <FileInput
                    name="productImage"
                    onChange={(e) => handleChange(e)}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-end pt-4">
                <Button
                    type="button"
                    onClick={skipConfiguration}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300  text-gray-800 rounded-lg transition-colors"
                >
                    <SkipForward />
                    Skip Configuration
                </Button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-viewer-core text-white rounded-lg disabled:bg-gray-400 flex items-center justify-center"
                >
                    {isLoading ? <Spinner /> : "Save and Continue"}
                </button>
            </div>
        </form>
    );
};

export default ConfigDetails;
